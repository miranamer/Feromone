import {useState} from 'react'
import {Text, Badge, Box, Divider, Button, useDisclosure} from '@chakra-ui/react'
import Vulnerable from '../components/Vulnerable'
import Comment from '../components/Comment'
import { useLocation } from 'react-router-dom'
import CommentModal from '../components/CommentModal'
import { useQuery } from '@apollo/client'

function ViewBug() {

    const location = useLocation();

    console.log('HERE -> ', location.state);
    
    let {
      id,
      title,
      description,
      severity,
      patched,
      vulnerableTech,
      comments,
    } = location.state.data;

    const [bugData, setBugData] = useState(location.state.data);

    const updateComments = (newComment) => {
        comments.push(newComment);
    };


    const severityColorMap = {
        'Low': 'green',
        'Medium': 'cyan',
        'High': 'yellow',
        'Very_High': 'orange',
        'Extreme': 'purple',
        'Code_Red': 'red'
      }
    
      const severityInsectMap = {
        'Low': '🐛',
        'Medium': '🦗',
        'High': '🐜',
        'Very_High': '🕷️',
        'Extreme': '🦂',
        'Code_Red': '🚨'
      }

    const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
        <div className="flex flex-col justify-center h-full px-[10%] py-[5%] gap-4">
            <div className="flex gap-3 items-center">
                <h1 className='text-5xl'>{title}</h1>
                <Badge fontSize='lg' className='h-full ml-3 mt-2' colorScheme={severityColorMap[severity]}>{severity} {severityInsectMap[severity]}</Badge>
            </div>
            <p className='text-xl text-blue-500 font-semibold'>ID: {id}</p>
            <Box className="w-[50%] text-2xl mt-5 border-2 border-gray-300 p-3 rounded-md">
                <p className='text-gray-500 underline mb-3 text-lg font-semibold italic'>Description:</p>
                <Text>
                    {description}
                </Text>
            </Box>
            <div className="flex flex-col gap-2 mt-10">
                <h2 className='text-xl'>Vulnerable Technologies:</h2>
                    <div className="flex gap-2 mt-2">
                    {vulnerableTech.length > 0 ? vulnerableTech.map((tech) => {
                        return (
                            <Vulnerable name={tech} />
                        )
                    }): <h1>N/A</h1>}
                </div>
            </div>

            <Divider className='mt-10'  />
            <div className="flex gap-2 items-center">
                <h2 className='text-xl'>Comments:</h2>
                <Button onClick={onOpen} colorScheme='blue' className='ml-2'>Add Comment</Button>
            </div>
            <div className="flex flex-col gap-5 mt-5">
                {comments && comments.map((comment) => {
                    return (
                        <Comment comment={comment} />
                    )
                })}
            </div>
        </div>
        <CommentModal id={id} isOpen={isOpen} onClose={onClose} updateComments={updateComments} />
    </>
  )
}

export default ViewBug