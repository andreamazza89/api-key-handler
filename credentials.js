function guardian() {
  return {
    key: process.env.GUARDIAN_KEY,
  };
};

function aylien() {
  return {
    applicationId: process.env.AYLIEN_APPLICATION_ID,
    key: process.env.AYLIEN_APPLICATION_KEY
  };
};

function tfl() {
  return {
    key: process.env.TFL_KEY,
    id: process.env.TFL_ID,
  };
};

module.exports = {
  guardian: guardian,
  aylien: aylien,
  tfl: tfl
}
