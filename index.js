// Trim leading/trailing bytes from a stream

var through = require('through2')

module.exports = trim

function trim(startByteSize, endByteSize) {
  endByteSize = endByteSize || 0
  var firstChunkTransformed = false
    , previousChunk

  return through(transform, flush)

  function transform(chunk, enc, cb) {
    if (previousChunk) this.push(previousChunk)
    previousChunk = chunk.slice(firstChunkTransformed ? 0 : startByteSize)
    firstChunkTransformed = true
    cb()
  }

  function flush(cb) {
    this.push(previousChunk.slice(0, -endByteSize))
    cb()
  }
}

// ---

// e.g.
//    echo -n 1234 | node trim-stream 1 1 #=> 23
var runWithStdin = !module.parent
if (runWithStdin) {
  var head = parseInt(process.argv[2])
    , tail = parseInt(process.argv[3])
  process.stdin.pipe(trim(head,tail)).pipe(process.stdout)
}
