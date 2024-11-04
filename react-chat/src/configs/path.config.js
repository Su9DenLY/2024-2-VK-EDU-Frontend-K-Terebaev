class PathConfig {
    prefixPath = import.meta.env.MODE === 'development' ? '' : '/2024-2-VK-EDU-Frontend-K-Terebaev';
    basePath = this.concatPath("/")
    chatsPath = this.concatPath("/chats")
    concatPath(path) {
        return this.prefixPath + path
    }
}

export const pathConfig = new PathConfig()