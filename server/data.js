const bugs = [
    {
        id: 0,
        title: 'Root Escalation w/ React & Vite',
        description: 'It can escalate to root access',
        severity: 'Extreme',
        patched: false,
        vulnerableTech: [
            'React-DOM',
            'Vite'
        ],
        comments: [
            "great work"
        ]
    },
    {
        id: 1,
        title: 'XSS - Reflected',
        description: 'Reflected XSS on github.com',
        severity: 'Low',
        patched: false,
        vulnerableTech: [
            'Github'
        ],
        comments: [
            "nice job",
            "on it!"
        ]
    }
]

module.exports = {bugs}