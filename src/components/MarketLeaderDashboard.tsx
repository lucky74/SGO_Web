type MarketOffer = {
  source: string;
  price: string;
  highlighted?: boolean;
};

type Competitor = {
  name: string;
  price: string;
};

type MarketReview = {
  snippet: string;
  label: string;
};

export type MarketLeaderData = {
  rating?: string;
  ota_prices?: MarketOffer[];
  competitors?: Competitor[];
  latest_reviews?: MarketReview[];
};

const MarketLeaderDashboard = ({ data }: { data: MarketLeaderData }) => {
  const otaPrices = data?.ota_prices || [];
  const competitors = data?.competitors || [];
  const reviews = data?.latest_reviews || [];

  return (
    <div className="p-4 md:p-6 bg-slate-900/60 rounded-2xl border border-slate-700/60">
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-slate-50">Market Leader Analysis</h2>
          <p className="text-xs text-slate-400">
            Real-time benchmark OTA dan kompetitor untuk hotel Anda.
          </p>
        </div>
        <span className="self-start md:self-auto bg-blue-500/10 text-blue-300 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-blue-500/30">
          SGO Intelligence
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-slate-900/80 p-4 rounded-xl shadow-sm border border-slate-700">
          <h3 className="text-xs md:text-sm font-bold text-slate-300 uppercase mb-3">
            Paritas Harga OTA
          </h3>
          {otaPrices.length === 0 ? (
            <p className="text-[11px] text-slate-500">
              Tidak ada data OTA. Pastikan pencarian kota sudah dilakukan dan data real-time
              tersedia.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {otaPrices.map((offer, idx) => (
                <div
                  key={`${offer.source}-${idx}`}
                  className={`p-3 rounded-lg bg-slate-800/80 border border-slate-700 ${
                    offer.highlighted ? 'border-blue-500/70 shadow-[0_0_15px_rgba(59,130,246,0.35)]' : ''
                  }`}
                >
                  <p
                    className={`text-[10px] font-semibold uppercase tracking-wide ${
                      offer.highlighted ? 'text-blue-300' : 'text-slate-400'
                    }`}
                  >
                    {offer.source}
                  </p>
                  <p className="text-lg font-black text-slate-50 mt-1">{offer.price}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-slate-900/80 p-4 rounded-xl shadow-sm border border-slate-700">
          <h3 className="text-xs md:text-sm font-bold text-slate-300 uppercase mb-3">
            Benchmark Kompetitor (Kelas yang Sama)
          </h3>
          {competitors.length === 0 ? (
            <p className="text-[11px] text-slate-500">
              Belum ada data kompetitor. Sistem akan menampilkan 3 hotel teratas di kelas yang sama
              berdasarkan hasil Google Hotels.
            </p>
          ) : (
            <div className="space-y-2">
              {competitors.map((c, idx) => (
                <div
                  key={`${c.name}-${idx}`}
                  className={`flex justify-between items-center text-sm ${
                    idx === 0 ? 'pb-2 border-b border-slate-700' : ''
                  }`}
                >
                  <span className="font-medium text-slate-100">{c.name}</span>
                  <span
                    className={`font-bold ${
                      idx === 0 ? 'text-emerald-400' : 'text-slate-100'
                    }`}
                  >
                    {c.price}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-slate-900/80 p-4 rounded-xl shadow-sm border border-slate-700 md:col-span-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
            <h3 className="text-xs md:text-sm font-bold text-slate-300 uppercase">
              Review Terbaru (Google)
            </h3>
            {data?.rating && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-yellow-300">
                <span className="text-lg">★</span>
                Rating: {data.rating}
              </span>
            )}
          </div>
          {reviews.length === 0 ? (
            <p className="text-[11px] text-slate-500">
              Belum ada review terbaru yang dapat ditampilkan dari data real-time.
            </p>
          ) : (
            <div className="space-y-3">
              {reviews.map((r, idx) => (
                <div
                  key={`${r.label}-${idx}`}
                  className="p-3 bg-slate-800/80 rounded-lg border border-slate-700"
                >
                  <p className="text-xs md:text-sm text-slate-100 italic">"{r.snippet}"</p>
                  <p className="text-[10px] font-semibold mt-2 text-blue-300">{r.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketLeaderDashboard;
