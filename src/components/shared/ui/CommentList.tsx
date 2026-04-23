import { formatDate } from "@/lib/utils/format";
import CommentItem from "./CommentItem";
import { Comment } from "@/features/blog/types/blog.types";

interface CommentListProps {
  comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
  if (!comments || comments.length === 0) {
    return (
      <div className="text-neutral9 py-6 text-center">
        هنوز دیدگاهی ثبت نشده است. اولین نفری باشید که نظر می‌دهید.
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="flex flex-col space-y-4">
          <CommentItem
            name={comment.name}
            role={comment.role}
            date={formatDate(comment.date)}
            text={comment.text}
          />
          {comment.reply && (
            <CommentItem
              name={comment.reply.name}
              role={comment.reply.role}
              date={formatDate(comment.reply.date)}
              text={comment.reply.text}
              isReply={true}
            />
          )}
        </div>
      ))}
    </div>
  );
}
