import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import axios from 'axios'; // axios 라이브러리를 사용하여 서버로부터 데이터를 받아옵니다.
import fakeData from '../data/fakeData';
import { formatDistanceToNow, parseISO } from 'date-fns';
import ko from 'date-fns/locale/ko'; // npm install date-fns
import TalkComment from './TalkComment';
const PostPage = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [isMentor, setIsMentor] = useState(false); // 현직자 인증 여부
    const [isOwner, setIsOwner] = useState(false); // 작성자 본인 여부

    useEffect(() => {
      // 서버에서 게시물 데이터를 받아오는 로직 (예시로 fakeData 사용)
      const foundPost = fakeData.find(p => p.id.toString() === postId);
      setPost(foundPost);

      // 현직자 인증 여부와 작성자 본인 여부를 설정하는 로직
      // 예시로 각각 true로 설정합니다. 실제로는 서버로부터 받은 데이터나 상태 관리 로직을 사용하여 설정해야 합니다.
      setIsMentor(true);
      setIsOwner(true);
  }, [postId]);

    if (!post) {
      return <div>글을 찾을 수 없습니다.</div>;
  }
  
  const timeAgo = formatDistanceToNow(parseISO(post.date), { addSuffix: true, locale: ko });
  const handleEdit = () => {
    // '수정하기' 버튼 클릭 시 수행할 로직을 여기에 추가하세요.
    console.log("게시글 수정 페이지로 이동");
};
/*
    useEffect(() => {
        // 가정: 서버에서 게시물 데이터를 받아오는 URL이 'https://your-server.com/posts/{postId}' 형태라고 가정
        axios.get(`http://localhost:8080/talks/${postId}`)
            .then(response => {
                const post = response.data;
                setPost(post);
            })
            .catch(error => {
                console.error('게시물을 불러오는 중 오류가 발생했습니다', error);
            });
    }, [postId]);

    if (!post) {
        return <div>글을 찾을 수 없습니다.</div>;
    }
    // 작성된 시각 표시 로직 (여기서는 단순히 예시로 현재 시간을 사용합니다.)
    const displayTime = new Date().toLocaleTimeString("ko-KR");
    */

    

    return (
      <PageContainer>
          <PostContainer>
          <TitleWrapper>
                    <Title>{post.title}</Title>
                    {isMentor && <MentorLabel>멘토</MentorLabel>}
                  
                    {isOwner && <EditButton onClick={handleEdit}>수정하기
                    <EditImage src="../assets/Group73.png" alt="Profile"/>
              </EditButton>}
                </TitleWrapper>
               <Content>{post.content}</Content>
               <PostingInfoConatiner>
               <ProfileImage src="../assets/MyProfile.png" alt="Profile"/>
               {/*<ProfileImage src={post.userProfileImageUrl} alt="Profile"/>*/}
                  <User>{post.username}</User>
                  <WrittenTime>{timeAgo}</WrittenTime>
               </PostingInfoConatiner>
               <Categories>
                    {post.category.map((category, index) => (
                        <Category key={index}>{category}</Category>
                    ))}
                </Categories>
          </PostContainer>
          <TalkComment/>
      </PageContainer>
  );
};
export default PostPage;

const Categories = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 18px;
    margin-left: 103px;
    
`;
const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
height: 62px;
margin-top: 59px;
margin-left: 102px;
`;

const EditImage = styled.img`
  width: 14.23px;
  height: 20.26px;
  margin-left: 5px; // 텍스트와 이미지 사이의 간격을 조정합니다.
`;
const MentorLabel = styled.span`
    background-color: #9FAEFF; // 멘토 라벨 배경색
    color: #FFFFFF; // 멘토 라벨 글자색
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    font-weight: bold;
    font-size: 20px;
    width: 81px;
    height: 42.23px;
    margin-left: 17px;
    margin-right: 300px;
`;

const Category = styled.span`
margin-top: 10px;
display: flex;
width: 125px;
height: 40px;
    background-color: white;
    border-radius: 5px;
    margin-right: 16px;
    font-size: 16px;
    font-weight: 700;
    color: #5B00EF;
    border: 2px solid #5B00EF;
    align-items: center;
    justify-content: center;
`;



const EditButton = styled.button`
  background-color: transparent;
  color: #636363;
  font-size: 18px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;
  font-weight: 700;
  display: flex; // flexbox를 사용하여 내부 요소들을 정렬합니다.
  align-items: center; // 버튼 내의 요소들을 세로 중앙에 배치합니다.
  justify-content: center; // 버튼 내의 요소들을 가로 중앙에 배치합니다.
`;
const PostingInfoConatiner=styled.div`
display: flex;
  align-items: center;
  margin-top: 10px;
  margin-left: 97px;
`;
const User=styled.div`
margin-right: 11px;
font-size: 17px;
color: #636363;
font-weight: 600;

`;
const WrittenTime=styled.div`
font-size: 17px;
font-weight: 600;
color: #636363;

`;
const ProfileImage=styled.img`
width: 40px;
height: 40px;
margin-right: 11px;
`;

  const PageContainer=styled.div`
  align-items: center;
  background-color: #EFF0F4;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  `;

  const PostContainer = styled.div`
  background: #FFF;
  border: 2px solid #E2E2E2;
  border-radius: 1.25rem 1.25rem 0 0;  display: flex;
  align-items: left;
  flex-direction: column;
  width: 75rem;
  align-items: left;
  margin-top: 3.69rem;
  margin-left: 6.38rem;
  padding-bottom: 55px;
`;



const Title = styled.h1`
color: #000;
font-family: SUITE;
font-size: 3.125rem;
font-weight: 700;

`;

const Content = styled.p`
width: 62.5rem;
font-family: SUITE;
font-size: 1.5625rem;
font-weight: 600;
line-height: 2.34375rem;
color: #636363;
margin-top: 30px;
margin-left: 101px;
padding-bottom: 2px; /* 내용 하단에 20px의 여백 추가 */
    overflow-wrap: break-word; 

`;
