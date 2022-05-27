export default function getData() {
  return {
    args: process.argv.slice(2),
    platform: process.platform,
    nodejsv: process.version,
    rss: process.memoryUsage().rss,
    path: process.execPath,
    processId: process.pid,
    folder: process.cwd(),
  };
}
