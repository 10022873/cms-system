function maskEmail(email) {
  if (!email) return '';
  const [name, domain] = email.split('@');
  return `${name[0]}${'*'.repeat(name.length - 1)}@${domain}`;
}

function maskPhone(phone) {
  if (!phone) return '';
  return `${phone.slice(0, 2)}${'*'.repeat(phone.length - 4)}${phone.slice(-2)}`;
}

module.exports = { maskEmail, maskPhone };