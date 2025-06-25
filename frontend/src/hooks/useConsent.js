import { useState } from 'react';
import api from '../services/api';

export const useConsent = () => {
  const [consents, setConsents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchConsents = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/consents');
      setConsents(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch consents');
    } finally {
      setLoading(false);
    }
  };

  const createConsent = async (consentData) => {
    setLoading(true);
    try {
      const { data } = await api.post('/consents', consentData);
      setConsents([...consents, data]);
      return data;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create consent');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { consents, loading, error, fetchConsents, createConsent };
};