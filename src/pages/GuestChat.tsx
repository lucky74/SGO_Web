import React, { useEffect, useMemo, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import { useLanguage } from '../contexts/LanguageContext';

type Message = {
  id: string;
  name: string;
  role: string;
  text: string;
  at: number;
};

const GuestChat: React.FC = () => {
  const { t, language } = useLanguage();
  const locale = language === 'EN' ? 'en-US' : 'id-ID';
  const roles = [
    t('chat_role_owner'),
    t('chat_role_gm'),
    t('chat_role_manager'),
    t('chat_role_other')
  ];
  const [name, setName] = useState('');
  const [role, setRole] = useState('Owner');
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [now, setNow] = useState<number>(() => Date.now());

  const params = useMemo(() => {
    if (typeof window === 'undefined') return { room: '', token: '', start: '' };
    const search = new URLSearchParams(window.location.search);
    return {
      room: search.get('room') || '',
      token: search.get('token') || '',
      start: search.get('start') || ''
    };
  }, []);

  const channelName = useMemo(() => {
    if (!params.room || !params.token) return '';
    const tokenPart = params.token.substring(0, 8);
    return `discussion-${params.room}-${tokenPart}`;
  }, [params.room, params.token]);

  const startAt = useMemo(() => {
    if (!params.start) return null as Date | null;
    const d = new Date(params.start);
    if (isNaN(d.getTime())) return null;
    return d;
  }, [params.start]);

  const notStartedYet = useMemo(() => {
    if (!startAt) return false;
    return now < startAt.getTime();
  }, [now, startAt]);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 15000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!channelName) return;
    const channel = supabase
      .channel(channelName)
      .on('broadcast', { event: 'message' }, (payload: any) => {
        const p = payload?.payload;
        if (!p?.id || !p.text) return;
        setMessages(prev => {
          if (prev.find(m => m.id === p.id)) return prev;
          return [...prev, p];
        });
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [channelName]);

  const handleJoin = () => {
    if (!params.room || !params.token) {
      setError(t('chat_error_invalid_link'));
      return;
    }
    if (!name.trim()) {
      setError(t('chat_error_name_required'));
      return;
    }
    if (notStartedYet && startAt) {
      setError(`${t('chat_error_not_started')} ${startAt.toLocaleString(locale)}`);
      return;
    }
    setError('');
    setJoined(true);
  };

  const handleSend = async () => {
    if (!text.trim() || !channelName || !joined) return;
    const msg: Message = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
      name: name.trim(),
      role,
      text: text.trim(),
      at: Date.now()
    };
    setText('');
    setMessages(prev => [...prev, msg]);
    await supabase.channel(channelName).send({
      type: 'broadcast',
      event: 'message',
      payload: msg
    });
  };

  const handleExportPdf = () => {
    if (!messages.length) {
      setError(t('chat_no_messages'));
      return;
    }
    const sorted = [...messages].sort((a, b) => a.at - b.at);
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 20;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text(t('minutes_title'), pageWidth / 2, y, { align: 'center' });
    y += 8;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    const dateSource = startAt ? startAt : new Date(sorted[0].at);
    const dateStr = dateSource.toLocaleString(locale);

    doc.text(`${t('minutes_room_label')} : ${params.room}`, 20, y);
    y += 6;
    doc.text(`${t('minutes_date_label')} : ${dateStr}`, 20, y);
    y += 6;

    doc.setFontSize(10);
    doc.text(t('minutes_note'), 20, y);
    y += 8;

    sorted.forEach(m => {
      const timeStr = new Date(m.at).toLocaleTimeString(locale, {
        hour: '2-digit',
        minute: '2-digit'
      });
      const header = `${timeStr} ${m.role} (${m.name}):`;
      const textLines = doc.splitTextToSize(m.text, pageWidth - 40);

      if (y + textLines.length * 5 + 6 > 280) {
        doc.addPage();
        y = 20;
      }

      doc.setFont('helvetica', 'bold');
      doc.text(header, 20, y);
      y += 5;

      doc.setFont('helvetica', 'normal');
      textLines.forEach((line: string) => {
        doc.text(line, 24, y);
        y += 5;
      });
      y += 3;
    });

    const safeRoom = params.room.replace(/[^A-Za-z0-9\-]/g, '');
    const fileName = `Meeting-Minutes-${safeRoom || 'MarketHotel'}.pdf`;
    doc.save(fileName);
  };

  if (!params.room || !params.token) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-slate-900 text-slate-100'>
        <div className='glass-card p-6 rounded-xl max-w-md text-center'>
          <h1 className='text-xl font-bold mb-2'>{t('chat_not_found_title')}</h1>
          <p className='text-sm text-slate-400'>{t('chat_not_found_desc')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-900 text-slate-100'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='glass-card p-4 md:p-6 rounded-2xl w-full max-w-2xl border border-slate-700/60 bg-slate-900/70 backdrop-blur-xl flex flex-col h-[90vh]'
      >
        <div className='mb-4'>
          <h1 className='text-2xl font-bold mb-1'>{t('chat_title')}</h1>
          <p className='text-xs text-slate-400'>
            {t('minutes_room_label')}: <span className='font-mono text-slate-200'>{params.room}</span>
          </p>
          {startAt && (
            <p className='text-xs text-amber-300 mt-1'>
              {t('discussion_schedule_label')}: {startAt.toLocaleString(locale)}
            </p>
          )}
        </div>

        {!joined && (
          <div className='mb-4 space-y-3'>
            <p className='text-sm text-slate-300'>
              {t('chat_join_intro')}
              {startAt && notStartedYet && (
                <span className='block text-xs text-amber-300 mt-1'>
                  {t('chat_not_started_notice_prefix')} {startAt.toLocaleString(locale)}. {t('chat_not_started_notice_suffix')}
                </span>
              )}
            </p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
              <input
                type='text'
                placeholder={t('chat_name_placeholder')}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500'
              />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className='bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500'
              >
                {roles.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            {error && <p className='text-xs text-red-400'>{error}</p>}
            <button
              onClick={handleJoin}
              disabled={notStartedYet}
              className='bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-400 text-white px-4 py-2 rounded-lg text-sm font-bold'
            >
              {t('chat_join_button')}
            </button>
          </div>
        )}

        <div className='flex-1 flex flex-col border border-slate-700 rounded-xl bg-slate-900/60 overflow-hidden'>
          <div className='flex-1 overflow-y-auto p-3 space-y-2'>
            {messages.length === 0 && (
              <p className='text-xs text-slate-500 text-center mt-4'>
                {t('chat_no_messages')}
              </p>
            )}
            {messages.sort((a, b) => a.at - b.at).map(m => (
              <div key={m.id} className='text-xs'>
                <div className='flex items-center gap-2'>
                  <span className='font-semibold text-slate-100'>{m.name}</span>
                  <span className='text-[10px] px-2 py-0.5 rounded-full bg-slate-700 text-slate-200'>{m.role}</span>
                  <span className='text-[10px] text-slate-500'>
                    {new Date(m.at).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className='ml-1 text-slate-200'>{m.text}</p>
              </div>
            ))}
          </div>
          <div className='border-t border-slate-700 p-3 flex items-center gap-2'>
            <input
              type='text'
              placeholder={joined ? t('chat_input_placeholder') : t('chat_input_placeholder_locked')}
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={!joined || notStartedYet}
              className='flex-1 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500 disabled:opacity-60'
            />
            <button
              onClick={handleSend}
              disabled={!joined || !text.trim() || notStartedYet}
              className='bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-400 text-white px-4 py-2 rounded-lg text-sm font-bold'
            >
              {language === 'EN' ? 'Send' : 'Kirim'}
            </button>
          </div>
        </div>

        <div className='mt-3 flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] text-slate-500'>
          <p className='text-center md:text-left'>
            {t('chat_ephemeral_info')}
          </p>
          <button
            onClick={handleExportPdf}
            className='px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold'
          >
            {t('chat_export_pdf_button')}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default GuestChat;
