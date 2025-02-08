function formatStream(data, event = 'message') {
// const message = JSON.parse({content: data});

  return `event: ${event}\ndata: ${data}\n\n`;
}

module.exports = { formatStream };