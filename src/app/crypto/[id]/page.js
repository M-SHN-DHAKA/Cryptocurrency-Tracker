import Navbar from '../../components/Navbar';

async function getCryptoData(id) {
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`, {
    headers: {
      'x-cg-demo-api-key': process.env.NEXT_PUBLIC_COINGECKO_API_KEY,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    return null;
  }
  return res.json();
}

export default async function CryptoDetails({ params }) {
  const { id } = await params;
  const cryptoData = await getCryptoData(id);

  if (!cryptoData) {
    return (
      <>
        <Navbar />
        <div className="container mt-5">
          <p className="text-danger">Data not found. Please try again.</p>
        </div>
      </>
    );
  }

  const description = cryptoData.description?.en?.split('.')[0] || 'No description available';

  return (
    <>
      <Navbar />
      <div className="container mt-5 d-flex justify-content-center">
        <div className="card" style={{ maxWidth: '500px' }}>
          <img
            src={cryptoData.image?.small}
            className="card-img-top mx-auto mt-3"
            alt={cryptoData.name}
            style={{ maxWidth: '100px' }}
          />
          <div className="card-body">
            <h1 className="card-title">{cryptoData.name}</h1>
            <h6 className="card-text text-muted">{description}</h6>

            <p className="card-text"><b>Symbol:</b> {cryptoData.symbol?.toUpperCase()}</p>
            <p className="card-text"><b>Rank:</b> {cryptoData.market_cap_rank}</p>
            <p className="card-text"><b>Market Cap:</b> ${cryptoData.market_data?.market_cap?.usd?.toLocaleString()}</p>
            <p className="card-text"><b>Current Price:</b> ${cryptoData.market_data?.current_price?.usd?.toLocaleString()}</p>
            <p className="card-text"><b>Total Supply:</b> {cryptoData.market_data?.total_supply?.toLocaleString()}</p>
            <p className="card-text"><b>Circulating Supply:</b> {cryptoData.market_data?.circulating_supply?.toLocaleString()}</p>
            <p className="card-text"><b>24h High:</b> ${cryptoData.market_data?.high_24h?.usd?.toLocaleString()}</p>
            <p className="card-text"><b>24h Low:</b> ${cryptoData.market_data?.low_24h?.usd?.toLocaleString()}</p>
            <p className="card-text"><b>24h Market Cap Change:</b> {cryptoData.market_data?.market_cap_change_percentage_24h?.toFixed(2)}%</p>
          </div>
        </div>
      </div>
    </>
  );
}