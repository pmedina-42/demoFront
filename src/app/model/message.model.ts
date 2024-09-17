export interface Message {
    content: string,
    category: string,
    author: string
}

export interface Category {
    name: string
    messages: Array<Message>
}