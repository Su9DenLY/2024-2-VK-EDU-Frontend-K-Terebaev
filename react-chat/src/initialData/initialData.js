const initialChats = []
const initialUsers = []
initialUsers.push({
    'id': 1,
    'fullname': 'Элизабет',
    'username': 'lizzy',
    'bio': 'Меня зовут Лена. Мне 15',
    'chats': [1, 3]
})
initialUsers.push({
    'id': 2,
    'fullname': 'Дженнифер',
    'username': 'ogjenny',
    'bio': 'Рэперы говорят, что блогеры лезут к ним в рэп. Я не согласна с этим!',
    'chats': [1, 2, 4]
})
initialUsers.push({
    'id': 3,
    'fullname': 'Иннокентий',
    'username': 'kostyan',
    'bio': 'Штирлиц взялся за дверную ручку и попробовал открыть — не получается, толкнул дверь плечом — тщетно, ударил ногой — без результата... \n' +
        '"Заперли", — тонким чутьем разведчика догадался Штирлец. И только Мюллер знал, что дверь открывается в другую сторону.',
    'chats': [4]
})
initialUsers.push({
    'id': 4,
    'fullname': 'Евлампий',
    'username': 'pampushka',
    'bio': 'Мама назвала меня Евлампий, но я хотел быть Акакием',
    'chats': [2, 3]
})
initialChats.push({'id': 1, 'users': [1, 2], 'messages': []})
initialChats.push({'id': 2, 'users': [2, 4], 'messages': []})
initialChats.push({'id': 3, 'users': [1, 4], 'messages': []})
initialChats.push({'id': 4, 'users': [2, 3], 'messages': []})

export {initialChats, initialUsers}
