function trim() {
    if()
    return this.replace(/(0*$)/g, "");
}

String.prototype.trim = trim;

console.log("1352.242300000".trim());