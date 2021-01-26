import React, {useEffect, useState} from 'react';
import {currentSubmission} from '../data/Global';
import {useSelector, useDispatch} from 'react-redux';
import Container from 'react-bootstrap/Container';
import {intifiy, toDateTimeString} from '../Util/TimeUtil';
import Table from 'react-bootstrap/Table';
import {Form, Button} from 'react-bootstrap';
import {getComments, sendComment} from '../API/API';
import {currentUser} from '../data/Global';
import UploadDisplayer from '../components/UploadDisplayer';
export default function SubmissionTeacherView() {
  const submission = useSelector(currentSubmission);

  useEffect(() => {
    console.log('submission', submission);
  }, []);

  return (
    <Container>
      <h1 className=" p-3 mb-3">{submission.homeworkTitle}</h1>
      <SubmissionDetails sub={submission.submission} stu={submission.student} />
    </Container>
  );
}

const SubmissionDetails = ({sub, stu}) => {
  const user = useSelector(currentUser);

  return (
    <div className="submission-details-table">
      <Table responsive>
        <tbody>
          <tr>
            <td>ID:</td>
            <td>{stu.id}</td>
          </tr>
          <tr>
            <td>Name:</td>
            <td>{`${stu.fname} ${stu.lname}`}</td>
          </tr>
          <tr>
            <td>Submitted At:</td>
            <td>{toDateTimeString(sub.created_at)}</td>
          </tr>

          <tr>
            <td>Grade:</td>
            <td>{sub.grade >= 0 ? sub.grade : '-'}</td>
          </tr>

          <tr>
            <td>Status:</td>
            <td>{sub.grade >= 0 ? 'Graded' : 'Waiting for grading'}</td>
          </tr>

          <tr>
            <td>Comments:</td>
            <td>
              <Comments submissionId={sub.id} stuId={stu.id} />
            </td>
          </tr>
        </tbody>
      </Table>
      {user && (
        <UploadDisplayer
          allowDelete={user.type == 'student'}
          allowUpload={user.type == 'student'}
          fkValue={sub.id}
          fk="submissionid"
          table="submissionfile"
        />
      )}
    </div>
  );
};

const Comments = ({submissionId, stuId}) => {
  const [str, setStr] = useState('');
  const [comments, setComments] = useState([]);
  const user = useSelector(currentUser);

  const loadComments = (sub_id) => {
    getComments(sub_id).then((res) => {
      console.log('comments:', res.data);
      setComments(res.data);
    });
  };
  useEffect(() => {
    loadComments(submissionId);
  }, [submissionId]);

  const addComment = (content) => {
    if (content != '') {
      sendComment(
        user.id,
        `${user.fname} ${user.lname}`,
        user.type,
        submissionId,
        content
      ).then((res) => {
        loadComments(submissionId);
        setStr('')
      });
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    addComment(str);
    setStr('');
    return false;
  };

  const onChange = (e) => {
    setStr(e.target.value);
  };

  return (
    <div className="comments-container">
      {comments
        .sort((a, b) => intifiy(b.createdat) - intifiy(a.createdat))
        .map((c, i) => {
          return <Comment key={i} c={c} stuId={stuId} />;
        })}
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="formAddComment">
          <Form.Label>Add a comment</Form.Label>
          <Form.Control
            autoComplete="off"
            type="text"
            placeholder="Comment"
            onChange={onChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="float-right">
          Send
        </Button>
      </Form>
    </div>
  );
};

const Comment = ({c, stuId}) => {
  const isMe = stuId == c.authorid;

  const cn1 = `single-comment ${isMe && 'single-comment-me'}`;
  const cn2 = `single-comment-inner-container ${
    isMe && 'single-comment-inner-container-me'
  }`;
  const cn3 = `single-comment-box ${isMe && 'single-comment-box-me'}`;
  const cn4 = `single-comment-content ${isMe && 'single-comment-content-me'}`;

  return (
    <div className={cn1}>
      <div className={cn2}>
        <div className={cn3}>
          <div className="single-comment-author">{c.authorfullname}</div>
          <div className={cn4}>{c.content}</div>
          <div className="single-comment-time">
            {toDateTimeString(c.createdat)}
          </div>
        </div>
      </div>
    </div>
  );
};
