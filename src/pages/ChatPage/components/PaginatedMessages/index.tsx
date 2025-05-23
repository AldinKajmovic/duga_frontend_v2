import { useParams } from 'react-router';
import Message from '../Message';
import { debounceScroll } from '../../../../utils/debounceScroll';
import { useGetAllMessages } from '../../hooks';

export interface Message {
  id: string;
  message: string;
  createdAt: string;
  User: {
    id: number;
  };
  messagePhotoUrl: string;
  showAvatar: boolean;
}

const PaginatedMessages = ({
  otherUserProfilePhoto,
  currentUserProfilePhoto,
  otherUserName,
  currentUserName,
  otherUserId,
  receivedMessages,
}: {
  otherUserProfilePhoto: string;
  currentUserProfilePhoto: string;
  otherUserName: string;
  currentUserName: string;
  otherUserId: number | undefined;
  receivedMessages: Message[];
}) => {
  const { chatId } = useParams();
  const { messages, fetchNextPage } = useGetAllMessages(chatId!);
  const allMessages = [...receivedMessages, ...messages];
  const sortedMessages = allMessages.sort((a, b) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  return (
    <div
      onScroll={debounceScroll(() => {
        fetchNextPage();
      }, 500)}
      style={{ height: '500px', overflow: 'auto' }}
    >
      {sortedMessages.map((message, index) => {
        const previousMessage = sortedMessages[index - 1];
        const showAvatar = !previousMessage || previousMessage.User.id !== message.User.id;

        return (
          <Message
            otherUserName={otherUserName}
            currentUserName={currentUserName}
            currentUserProfilePhoto={currentUserProfilePhoto}
            otherUserProfilePhoto={otherUserProfilePhoto}
            key={message.id}
            message={message}
            otherUserId={otherUserId}
            messagePhotoUrl={message.messagePhotoUrl}
            showAvatar={showAvatar}
          />
        );
      })}
    </div>
  );
};

export default PaginatedMessages;
