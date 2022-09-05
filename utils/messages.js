function formatMessage(username, text) {
  let time = new Date().toLocaleTimeString();
  time = time.split(":").splice(0, 2).join(":") + " " + time.split(" ")[1].toLowerCase();
  return {
    username,
    text,
    time,
    info: username === "info",
  };
}

module.exports = { formatMessage };
