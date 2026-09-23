'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Navbar from './Navbar';

const CryptoList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 100,
              page: 1,
              sparkline: false,
              price_change_percentage: '1h,24h,7d',
            },
            headers: {
              'x-cg-demo-api-key': process.env.NEXT_PUBLIC_COINGECKO_API_KEY,
            },
          }
        );
        setData(response.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Data loading failed. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data.filter((crypto) =>
    crypto.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const changeColor = (value) => (value < 0 ? 'red' : 'green');

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="my-4 text-success">M SHN Cryptocurrency Tracker</h1>

        <input
          type="text"
          placeholder="Search crypto name"
          className="form-control mb-4"
          value={searchQuery}
          onChange={handleSearchChange}
        />

        {loading && <p>Loading...</p>}
        {error && <p className="text-danger">{error}</p>}

        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Symbol</th>
                  <th>Price</th>
                  <th>Market Cap</th>
                  <th>1h Change</th>
                  <th>24h Change</th>
                  <th>7d Change</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((crypto) => (
                  <tr key={crypto.id}>
                    <td>
                      <img
                        src={crypto.image}
                        alt={crypto.name}
                        className="rounded-circle me-2"
                        style={{ width: '30px', height: '30px' }}
                      />
                      <Link
                        href={`/crypto/${crypto.id}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        {crypto.name}
                      </Link>
                    </td>
                    <td>{crypto.symbol.toUpperCase()}</td>
                    <td>${crypto.current_price.toLocaleString()}</td>
                    <td>${crypto.market_cap.toLocaleString()}</td>
                    <td style={{ color: changeColor(crypto.price_change_percentage_1h_in_currency) }}>
                      {crypto.price_change_percentage_1h_in_currency?.toFixed(2)}%
                    </td>
                    <td style={{ color: changeColor(crypto.price_change_percentage_24h_in_currency) }}>
                      {crypto.price_change_percentage_24h_in_currency?.toFixed(2)}%
                    </td>
                    <td style={{ color: changeColor(crypto.price_change_percentage_7d_in_currency) }}>
                      {crypto.price_change_percentage_7d_in_currency?.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default CryptoList;