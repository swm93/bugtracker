function Logger() {
    this.level = window.loggingLevel || 0;
    delete window.loggingLevel;
}

Logger.prototype.debug = function(message) {
    if (this.level <= 0) {
        window.console.log("DEBUG: " + message);
    }
};

Logger.prototype.info = function(message) {
    if (this.level <= 1) {
        window.console.log("INFO: " + message);
    }
};

Logger.prototype.warn = function(message) {
    if (this.level <= 2) {
        window.console.log("WARN: " + message);
    }
};

Logger.prototype.error = function(message) {
    if (this.level <= 3) {
        window.console.log("ERROR: " + message);
    }
};

Logger.prototype.fatal = function(message) {
    if (this.level <= 4) {
        window.console.log("FATAL: " + message);
    }
};


window.Logger = new Logger();