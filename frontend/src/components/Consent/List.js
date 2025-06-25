import { useEffect } from 'react';
import { useConsent } from '../../hooks/useConsent';

const ConsentList = () => {
  const { consents, loading, error, fetchConsents } = useConsent();

  useEffect(() => {
    fetchConsents();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-4">
      {consents.map((consent) => (
        <div key={consent._id} className="border p-4 rounded-lg shadow">
          <h3 className="font-bold">{consent.purpose}</h3>
          <p>Status: <span className="capitalize">{consent.status}</span></p>
          <p>Data Types: {consent.dataTypes.join(', ')}</p>
          {consent.expiryDate && (
            <p>Expires: {new Date(consent.expiryDate).toLocaleDateString()}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ConsentList;