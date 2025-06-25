import { useEffect, useState } from 'react';
import axios from 'axios';

function ConsentList() {
  const [consents, setConsents] = useState([]);

  useEffect(() => {
    const fetchConsents = async () => {
      try {
        const res = await axios.get('/api/consents');
        setConsents(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchConsents();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Consents</h2>
      <div className="space-y-4">
        {consents.map(consent => (
          <div key={consent._id} className="border p-4 rounded">
            <h3 className="font-semibold">{consent.purpose}</h3>
            <p>Status: {consent.status}</p>
            {consent.expiryDate && <p>Expires: {new Date(consent.expiryDate).toLocaleDateString()}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}