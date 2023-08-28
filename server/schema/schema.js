const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLEnumType, GraphQLBoolean, GraphQLList, GraphQLNonNull, GraphQLSchema } = require('graphql');
const { bugs } = require('../data'); // Update the import path as needed
const BugModel = require('../models/BugModel.ts');

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
        severity: {type: GraphQLString},
        patched: { type: GraphQLBoolean },
        vulnerableTech: { type: GraphQLList(GraphQLString) },
        comments: {type: new GraphQLList(GraphQLString)}
    })
});

//const BugSeveritiesEnum = new GraphQLEnumType({
    //name: 'BugSeverities',
    //values: {
        //Low: { value: 'Low' },
        //Medium: { value: 'Medium' },
        //High: { value: 'High' },
        //Very_High: { value: 'Very_High' },
        //Extreme: { value: 'Extreme' },
        //Code_Red: { value: 'Code_Red' }
    //}
//});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        allBugs: {
            type: new GraphQLList(BugType),
            resolve: (parent, args) => {
                let sortedBugs = [...bugs]; // Create a copy of the bugs array to avoid modifying the original data
                sortedBugs.sort((a, b) => severityMap[b.severity] - severityMap[a.severity]);
                return sortedBugs;
            }
        },

        bugFromID: {
            type: new GraphQLList(BugType),
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return [bugs.find(bug => bug.id == args.id)];
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
                bugSeverity: {type: GraphQLString}
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

const RootQueryMongo = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        allBugs: {
            type: new GraphQLList(BugType),
            resolve: async (parent, args) => {
                try {
                    const sortedBugs = await BugModel.find().sort({ severity: -1 });
                    return sortedBugs;
                } catch (error) {
                    console.error(error);
                    throw error;
                }
            }
        },

        bugFromID: {
            type: new GraphQLList(BugType),
            args: { id: { type: GraphQLID } },
            resolve: async (parent, args) => {
                try {
                    const bug = await BugModel.findById(args.id);
                    return [bug];
                } catch (error) {
                    console.error(error);
                    throw error;
                }
            }
        },

        allPatchedBugs: {
            type: new GraphQLList(BugType),
            resolve: async (parent, args) => {
                try {
                    const patchedBugs = await BugModel.find({ patched: true });
                    return patchedBugs;
                } catch (error) {
                    console.error(error);
                    throw error;
                }
            }
        },

        bugsBySeverity: {
            type: new GraphQLList(BugType),
            args: {
                bugSeverity: { type: GraphQLString }
            },
            resolve: async (parent, args) => {
                try {
                    const newBugs = await BugModel.find({ severity: args.bugSeverity });
                    return newBugs;
                } catch (error) {
                    console.error(error);
                    throw error;
                }
            }
        },

        searchBugs: {
            type: new GraphQLList(BugType),
            args: {
                query: { type: GraphQLString }
            },
            resolve: async (parent, args) => {
                try {
                    const searchTerm = args.query.toLowerCase();
                    const matchingBugs = await BugModel.find({
                        $or: [
                            { title: { $regex: searchTerm, $options: 'i' } },
                            { description: { $regex: searchTerm, $options: 'i' } }
                        ]
                    });
                    return matchingBugs;
                } catch (error) {
                    console.error(error);
                    throw error;
                }
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
                severity: { type: GraphQLNonNull(GraphQLString) },
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
                severity: { type: GraphQLString },
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

const MutationMongo = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addBug: {
            type: BugType,
            args: {
                title: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                severity: { type: GraphQLNonNull(GraphQLString) },
                patched: { type: GraphQLNonNull(GraphQLBoolean) },
                vulnerableTech: { type: GraphQLList(GraphQLString) },
                comments: { type: new GraphQLList(GraphQLString) }
            },
            resolve: async (parent, args) => {
                try {
                    const newBug = await BugModel.create({
                        title: args.title,
                        description: args.description,
                        severity: args.severity,
                        patched: args.patched,
                        vulnerableTech: args.vulnerableTech || [],
                        comments: args.comments || []
                    });
                    return newBug;
                } catch (error) {
                    console.error(error);
                    throw error;
                }
            }
        },

        deleteBug: {
            type: new GraphQLList(BugType),
            args: {
                id: { type: GraphQLID }
            },
            resolve: async (parent, args) => {
                try {
                    await BugModel.findByIdAndRemove(args.id);
                    const remainingBugs = await BugModel.find();
                    return remainingBugs;
                } catch (error) {
                    console.error(error);
                    throw error;
                }
            }
        },

        patchBug: {
            type: BugType,
            args: {
                id: { type: GraphQLID }
            },
            resolve: async (parent, args) => {
                try {
                    const bug = await BugModel.findById(args.id);
                    if (bug) {
                        bug.patched = !bug.patched;
                        await bug.save();
                        return bug;
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error(error);
                    throw error;
                }
            }
        },

        editBug: {
            type: BugType,
            args: {
                id: { type: GraphQLID },
                title: { type: GraphQLString },
                description: { type: GraphQLString },
                severity: { type: GraphQLString },
                patched: { type: GraphQLBoolean },
                vulnerableTech: { type: new GraphQLList(GraphQLString) },
                comments: { type: new GraphQLList(GraphQLString) }
            },
            resolve: async (parent, args) => {
                try {
                    const bug = await BugModel.findById(args.id);
                    if (!bug) {
                        return null; // Bug not found
                    }

                    if (args.title !== undefined) {
                        bug.title = args.title;
                    }
                    if (args.description !== undefined) {
                        bug.description = args.description;
                    }
                    if (args.severity !== undefined) {
                        bug.severity = args.severity;
                    }
                    if (args.patched !== undefined) {
                        bug.patched = args.patched;
                    }
                    if (args.vulnerableTech !== undefined) {
                        bug.vulnerableTech = args.vulnerableTech;
                    }
                    if (args.comments !== undefined) {
                        bug.comments = args.comments;
                    }

                    await bug.save();
                    return bug;
                } catch (error) {
                    console.error(error);
                    throw error;
                }
            }
        },

        addComment: {
            type: BugType,
            args: {
                id: { type: GraphQLID },
                comment: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: async (parent, args) => {
                try {
                    const bug = await BugModel.findById(args.id);
                    if (!bug) {
                        return null; // Bug not found
                    }
                    bug.comments.push(args.comment);
                    await bug.save();
                    return bug;
                } catch (error) {
                    console.error(error);
                    throw error;
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQueryMongo,
    mutation: MutationMongo
});
