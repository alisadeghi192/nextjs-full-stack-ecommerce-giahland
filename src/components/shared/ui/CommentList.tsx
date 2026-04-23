import CommentItem from "./CommentItem";

const comments = [
  {
    id: 1,
    name: "علی صادقی",
    role: "user" as const,
    date: "(1405/12/25)",
    text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطر آنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز",
    reply: {
      name: "مدیر سایت",
      role: "admin" as const,
      date: "(1405/12/26)",
      text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطر آنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز",
    },
  },
  {
    id: 2,
    name: "علی صادقی",
    role: "user" as const,
    date: "(1405/12/25)",
    text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطر آنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز",
  },
];

export default function CommentList() {
  return (
    <div className="flex flex-col space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="flex flex-col space-y-4">
          <CommentItem
            name={comment.name}
            role={comment.role}
            date={comment.date}
            text={comment.text}
          />
          {comment.reply && (
            <CommentItem
              name={comment.reply.name}
              role={comment.reply.role}
              date={comment.reply.date}
              text={comment.reply.text}
              isReply={true}
            />
          )}
        </div>
      ))}
    </div>
  );
}