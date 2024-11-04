class PathConfig {
    prefixPath = '';
    basePath = this.concatPath("/")
    chatsPath = this.concatPath("/chats")
    concatPath(path) {
        return this.prefixPath + path
    }
}

export const pathConfig = new PathConfig()