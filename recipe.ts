
var users = [
    { name: 'tj' }
    , { name: 'ciaran' }
    , { name: 'aaron' }
    , { name: 'guillermo' }
    , { name: 'simon' }
    , { name: 'tobi' }
];

export var Recipe = {
    index: function(req, res){
        res.send(users);
    },
    show: function(req, res){
        res.send(users[req.params.id] || { error: 'Cannot find user' });
    },
    destroy: function(req, res, id){
        var destroyed = id in users;
        delete users[id];
        res.send(destroyed ? 'destroyed' : 'Cannot find user');
    },
    range: function(req, res, a, b, format){
        var range = users.slice(a, b + 1);
        switch (format) {
            case 'json':
                res.send(range);
                break;
            case 'html':
            default:
                var html = '<ul>' + range.map(function(user){
                    return '<li>' + user.name + '</li>';
                }).join('\n') + '</ul>';
                res.send(html);
                break;
        }
    }
};
