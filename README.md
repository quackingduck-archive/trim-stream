Trim leading/trailing bytes from a stream

E.g.

  # trim first and last byte of stream
  $ echo -n abcd | node trim-stream 1 1
  bc
