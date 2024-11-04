const initialChats = []
const initialUsers = []
initialUsers.push({'id': 1, 'username': 'Элизабет', 'chats': [1, 3]})
initialUsers.push({'id': 2, 'username': 'Дженнифер', 'chats': [1, 2, 4]})
initialUsers.push({'id': 3, 'username': 'Иннокентий', 'chats': [4]})
initialUsers.push({'id': 4, 'username': 'Евлампий', 'chats': [2, 3]})
initialChats.push({'id': 1, 'users': [1, 2], 'messages': []})
initialChats.push({'id': 2, 'users': [2, 4], 'messages': []})
initialChats.push({'id': 3, 'users': [1, 4], 'messages': []})
initialChats.push({'id': 4, 'users': [2, 3], 'messages': []})

export {initialChats, initialUsers}