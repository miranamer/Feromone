const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLEnumType, GraphQLBoolean, GraphQLList, GraphQLNonNull, GraphQLSchema } = require('graphql');
const { bugs } = require('../data'); // Update the import path as needed

let bugCounter = bugs.length

const severityMap = {
    'Low': 0,
    'Medium': 1,
    'High': 2,
    'Very_High': 3,
    'Extreme': 4,
    'Code_Red': 5
};

const BugType = new GraphQLObjectType({
    name: 'Bug',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        severity: {
            type: BugSeveritiesEnum,
            resolve: bug => bug.severity // Resolve the enum value from the bug data
        },
        patched: { type: GraphQLBoolean },
        vulnerableTech: { type: GraphQLList(GraphQLString) },
        comments: {type: new GraphQLList(GraphQLString)}
    })
});

const BugSeveritiesEnum = new GraphQLEnumType({
    name: 'BugSeverities',
    values: {
        Low: { value: 'Low' },
        Medium: { value: 'Medium' },
        High: { value: 'High' },
        Very_High: { value: 'Very_High' },
        Extreme: { value: 'Extreme' },
        Code_Red: { value: 'Code_Red' }
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        allBugs: {
            type: new GraphQLList(BugType),
            args: {
                sortBySeverity: { type: GraphQLBoolean }
            },
            resolve: (parent, args) => {
                let sortedBugs = [...bugs]; // Create a copy of the bugs array to avoid modifying the original data
                if (args.sortBySeverity) {
                    sortedBugs.sort((a, b) => severityMap[b.severity] - severityMap[a.severity]); // Sort bugs by severity
                }
                return sortedBugs;
            }
        },

        bugFromID: {
            type: BugType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return bugs.find(bug => bug.id == args.id);
            }
        },

        allPatchedBugs: {
            type: new GraphQLList(BugType),
            resolve(parent, args){
                var patchedBugs = [];
                bugs.forEach((bug) => {
                    bug.patched === true ? patchedBugs.push(bug) : null;
                })

                return patchedBugs;
            }
        },

        bugsBySeverity: {
            type: new GraphQLList(BugType),
            args: {
                bugSeverity: {type: BugSeveritiesEnum}
            },
            resolve(parent, args){
                var newBugs = [];
                bugs.forEach((bug) => {
                    bug.severity == args.bugSeverity ? newBugs.push(bug) : null;
                })

                return newBugs
            }
        },

        searchBugs: {
            type: new GraphQLList(BugType),
            args: {
                query: { type: GraphQLString }
            },
            resolve(parent, args) {
                const searchTerm = args.query.toLowerCase();
                const matchingBugs = bugs.filter(
                    bug =>
                        bug.title.toLowerCase().includes(searchTerm) ||
                        bug.description.toLowerCase().includes(searchTerm)
                );
                return matchingBugs;
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addBug: {
            type: BugType,
            args: {
                title: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                severity: { type: GraphQLNonNull(BugSeveritiesEnum) },
                patched: { type: GraphQLNonNull(GraphQLBoolean) },
                vulnerableTech: { type: GraphQLList(GraphQLString) },
                comments: {type: new GraphQLList(GraphQLString)}
            },
            resolve: (parent, args) => {
                const newBug = {
                    id: bugCounter++, // Increment the counter and use it as the new ID
                    title: args.title,
                    description: args.description,
                    severity: args.severity,
                    patched: args.patched,
                    vulnerableTech: args.vulnerableTech || [],
                    comments: args.comments || []
                };
                bugs.push(newBug);
                return newBug;
            }
        },
        deleteBug: {
            type: new GraphQLList(BugType),
            args: {
                id: {type: GraphQLID}
            },
            resolve: (parent, args) => {
                const bugsNew = bugs.filter(bug => bug.id !== parseInt(args.id, 10));
                bugs.length = 0;
                bugs.push(...bugsNew);
                return bugsNew;
            }   
        },
        patchBug: {
            type: BugType,
            args: {
                id: {type: GraphQLID}
            },
            resolve: (parent, args) => {
                const bug = bugs.find(bug => bug.id === parseInt(args.id, 10));
                if (bug) {
                    bug.patched = !bug.patched;
                }
                return bug; // Return the updated bugs array
            }   
        },
        editBug: {
            type: BugType,
            args: {
                id: { type: GraphQLID },
                title: { type: GraphQLString },
                description: { type: GraphQLString },
                severity: { type: BugSeveritiesEnum },
                patched: { type: GraphQLBoolean },
                vulnerableTech: { type: new GraphQLList(GraphQLString) },
                comments: {type: new GraphQLList(GraphQLString)}
            },
            resolve: (parent, args) => {
                const bugIndex = bugs.findIndex(bug => bug.id === parseInt(args.id, 10));
        
                if (bugIndex !== -1) {
                    // Update the bug fields if provided
                    if (args.title !== undefined) {
                        bugs[bugIndex].title = args.title;
                    }
                    if (args.description !== undefined) {
                        bugs[bugIndex].description = args.description;
                    }
                    if (args.severity !== undefined) {
                        bugs[bugIndex].severity = args.severity;
                    }
                    if (args.patched !== undefined) {
                        bugs[bugIndex].patched = args.patched;
                    }
                    if (args.vulnerableTech !== undefined) {
                        bugs[bugIndex].vulnerableTech = args.vulnerableTech;
                    }
                    if (args.comments !== undefined) {
                        bugs[bugIndex].comments = args.comments;
                    }
        
                    return bugs[bugIndex]; // Return the updated bug
                }
        
                return null; // Bug not found
            }
        },
        
        addComment: {
            type: BugType,
            args: {
                id: {type: GraphQLID},
                comment: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                var bug = bugs.find(bug => bug.id == parseInt(args.id, 10));
                bug.comments.push(args.comment);
                return bug;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
