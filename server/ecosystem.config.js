module.exports = {
  apps: [{
    name: "ProHire",
    script: "index.js",
    instances: "max",
    exec_mode: "cluster",
    error_file: "logs/error.log",
    out_file: "logs/output.log",
    log_file: "logs/combined.log",
    merge_logs: true,
    autorestart:false,
    env_production: {
      PORT: 3000
    }
  }]
}
