const bugs = [
    {
        id: 0,
        title: 'Comments Not Showing',
        description: 'Comments dont show on page',
        severity: 'Medium',
        patched: false,
        vulnerableTech: [
            'Comment System',
            'Users Page'
        ],
        comments: [
            "great find!"
        ]
    },
    {
        id: 1,
        title: 'XSS - Reflected',
        description: 'Reflected XSS on main page',
        severity: 'High',
        patched: false,
        vulnerableTech: [
            'All Components'
        ],
        comments: [
            "nice job",
            "on it!"
        ]
    }
]

module.exports = {bugs}