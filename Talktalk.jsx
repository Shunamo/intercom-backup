import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';


const fakeData = [
    { id: 1, title: "가짜질문글 학점 잘 따는 법", content: "이번학기 학점망했는데 복구할수있을까여.", answers: 5, comments: 2, views: 100, likes: 25, date: "2023-01-01 09:00:00" },
    { id: 2, title: "가짜질문글 컴공 3-1 힘들까요?", content: "2-2 넘 힘들었는데 3학년 되기 무섭네여.", answers: 3, comments: 1, views: 150, likes: 30, date: "2023-01-02 10:30:00" },
    { id: 3, title: "가짜질문글 네이버 인턴 합격 후기", content: "안녕하세요 저는 이번에 .......", answers: 2, comments: 4, views: 200, likes: 50, date: "2023-01-03 11:45:00" },
    { id: 4, title: "가짜질문글 백준 티어 빠르게 올리는 법", content: "난이도가 제각각인듯.", answers: 7, comments: 5, views: 90, likes: 20, date: "2023-01-04 12:00:00" },
    { id: 5, title: "가짜질문글 개발 진로 어디로 정해야 될까여", content: "웹개발은 너무 레드오션인거같아서 흑흑.", answers: 1, comments: 0, views: 300, likes: 100, date: "2023-01-05 14:30:00" },
    { id: 6, title: "가짜질문글 후라이의 꿈", content: "차라리 흘러갈래 냥돌냥돌냥돌냥.", answers: 0, comments: 2, views: 50, likes: 10, date: "2023-01-06 15:20:00" },
    { id: 7, title: "가짜질문글 점메추 해주세여 흐흐", content: "제육제외.", answers: 4, comments: 3, views: 120, likes: 40, date: "2023-01-07 16:45:00" },
    { id: 8, title: "가짜질문글 인터폰 힘내세요", content: "네이버 카카오 인터폰 레츠공.", answers: 6, comments: 7, views: 110, likes: 60, date: "2023-01-08 17:30:00" },
    { id: 9, title: "가짜질문글 졸리다졸려졸려", content: "돈보다는 마음이 내게는 더 와닿아.", answers: 8, comments: 6, views: 250, likes: 70, date: "2023-01-09 18:15:00" },
    { id: 10, title: "가짜질문글 마지막 가짜질문글~", content: "날 안아줬던 너의 심장은 절대 안잊어 난 말랐다 허나 내 마음만큼은 살쪄", answers: 20, comments: 3, views: 26, likes: 29, date: "2024-01-21 04:36:33"}
]  

const Talktalk = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [top100Active, setTop100Active] = useState(true);
    const [allPostsActive, setAllPostsActive] = useState(false);
    const [dateSortActive, setDateSortActive] = useState(true);
    const [likesSortActive, setLikesSortActive] = useState(false);
    const [answersSortActive, setAnswersSortActive] = useState(false);
  
    useEffect(() => {
      setSearchResults(fakeData);
    }, []);
  
    const handleGoLogin = () => {
      navigate('/join');
    };
  
    const handleGoSearch = () => {
      navigate('/search');
    };

    const handleSubmit = (event) => { 
        event.preventDefault();
        //이거 아직 안함!
      };
    const handleTop100Click = () => {
      setTop100Active(true);
      setAllPostsActive(false);
      const sortedByViews = [...fakeData].sort((a, b) => b.views - a.views);
      setSearchResults(sortedByViews.slice(0, 100));
    };
  
    const handleAllPostsClick = () => {
      setTop100Active(false);
      setAllPostsActive(true);
      const sortedByDate = [...fakeData].sort((a, b) => new Date(b.date) - new Date(a.date));
      setSearchResults(sortedByDate);
    };
  
    const handleSortByDate = () => {
      setDateSortActive(true);
      setLikesSortActive(false);
      setAnswersSortActive(false);
      const sortedByDate = [...fakeData].sort((a, b) => new Date(b.date) - new Date(a.date));
      setSearchResults(sortedByDate);
    };
  
    const handleSortByLikes = () => {
      setDateSortActive(false);
      setLikesSortActive(true);
      setAnswersSortActive(false);
      const sortedByLikes = [...fakeData].sort((a, b) => b.likes - a.likes);
      setSearchResults(sortedByLikes);
    };
  
    const handleSortByAnswers = () => {
      setDateSortActive(false);
      setLikesSortActive(false);
      setAnswersSortActive(true);
      const sortedByAnswers = [...fakeData].sort((a, b) => b.answers - a.answers);
      setSearchResults(sortedByAnswers);
    };

  return(
    <PageContainer>
      <WritingContainer onClick={handleGoLogin}>
      <img 
        src="./assets/Ellipse2.png" 
        alt="Profile image"
        style={{ marginLeft: '6.38rem', width:'78px', height:'78px'}}
        />
        <LoggedOutWriting>
          로그인하고 글을 남겨보세요.
        </LoggedOutWriting>
      </WritingContainer>

      <TalkButtonContainer>
      <ButtonsContainer>
        <Button onClick={handleTop100Click} active={top100Active}>Top 100</Button>
        <Button onClick={handleAllPostsClick} active={allPostsActive}>전체 글</Button>
      </ButtonsContainer>
      <TalkContainer >
        <SearchInputContainer onSubmit={handleSubmit}>
        <img src="./assets/SearchGray.png" 
        alt="Search Icon" 
        style={{ margin: '1.19rem 1.75rem 1.21rem 1.75rem' }} 
        onClick={handleGoSearch}
        />
            <SearchInput
             type="text"
              placeholder="원하는 글을 검색해 보세요."
               value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
             />
             
        </SearchInputContainer>
        {allPostsActive && (
        <SortButtonsContainer>
          <SortButton 
          onClick={handleSortByDate}>
          <ButtonImage src={dateSortActive  ? "./assets/Vector14.png" : "./assets/Ellipse26.png"} alt="button image"/>
          최근 작성순
          </SortButton>
          <SortButton 
          onClick={handleSortByLikes}>
          <ButtonImage src={likesSortActive  ? "./assets/Vector14.png" : "./assets/Ellipse26.png"} alt="button image"/>
            좋아요순
            </SortButton>
          <SortButton 
           onClick={handleSortByAnswers}>
          <ButtonImage src={answersSortActive  ? "./assets/Vector14.png" : "./assets/Ellipse26.png"} alt="button image"/>
            답변많은순
            </SortButton>
        </SortButtonsContainer>
      )}

        <TalkListContainer>
            {searchResults.map(item => (
                <SearchResultItem key={item.id}>
                     <p className="title">{item.title}</p>
                     <p className="content">{item.content}</p>
                     <p className="response">답변: {item.answers} | 댓글: {item.comments} | 조회수: {item.views} | 좋아요: {item.likes}</p>
                </SearchResultItem>
            ))}
        </TalkListContainer>
        
        </TalkContainer>
        </TalkButtonContainer>
    </PageContainer>
  );
};

export default Talktalk;


const PageContainer = styled.div`
  align-items: center;
  background-color: #EFF0F4;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const WritingContainer = styled.div`
  align-items: center;
  background-color: #FFF;
  border: 2px solid #E2E2E2;
  border-radius: 1.25rem;
  display: flex;
  height: 10.6875rem;
  justify-content: center;
  margin-top: 4.56rem;
  width: 75rem;
`;

const LoggedOutWriting = styled.div`
  align-items: center;
  background-color: #E2E2E2;
  border-radius: 1.3rem;
  box-sizing: border-box;
  color: #A1A1A1;
  display: flex;
  font-size: 1.5625rem;
  font-weight: 800;
  height: 5rem;
  justify-content: left;
  margin-left: 1.5rem;
  padding-left: 2.69rem;
  width: 55.875rem;
`;

const TalkContainer = styled.div`
  background: #FFF;
  border: 2px solid #E2E2E2;
  border-radius: 1.25rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 75rem;
`;

const SearchInputContainer = styled.div`
  align-items: center;
  border: 3px solid #A1A1A1;
  border-radius: 0.625rem;
  display: flex;
  height: 4rem;
  margin-left: 3.94rem;
  margin-top: 3.81rem;
  width: 27.75rem;
`;

const SearchInput = styled.input`
  border: none;
  font-family: 'SUITE', sans-serif;
  font-size: 1.3rem;
  height: 3rem;
  outline: none;
  width: 20rem;
`;

const SearchResultItem = styled.div`
  border-bottom: 1px solid #ddd;
  height: 9.6875rem;
  margin-left: 4.88rem;
  width: 65.25rem;

  .title {
    color: #000;
    font-size: 1.5625rem;
    font-weight: 800;
    margin-bottom: 0.56rem;
  }

  .content {
    color: #A1A1A1;
    font-size: 1.25rem;
    font-weight: 600;
  }

  .response {
    color: #636363;
    font-size: 1.0625rem;
    font-weight: 700;
  }
`;

const TalkListContainer = styled.div`
  margin-top: 3.56rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 52rem;
  margin-top: 4.56rem;
  width: 100%;
`;

const Button = styled.button`
  align-text: center;
  background-color: ${props => props.active ? '#5B00EF' : 'transparent'};
  border: ${props => props.active ? 'none' : '2px solid #E2E2E2'};
  border-bottom: none;
  border-radius: 0.3125rem;
  color: ${props => props.active ? 'white' : '#A1A1A1'};
  cursor: pointer;
  font-family: 'SUITE', sans-serif;
  font-size: 1rem;
  font-weight: 800;
  height: 2.5rem;
  margin-right: 1.13rem;
  width: 7.8125rem;

  &:hover {
    background-color: ${props => !props.active && '#E2E2E2'};
    color: ${props => !props.active && 'white'};
  }
`;

const TalkButtonContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 4rem;
  width: 100%;
`;

const SortButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 15rem;
  margin-top: -1.69rem;
`;

const SortButton = styled.button`
  background-color: white;
  border: none;
  font-family: 'SUITE', sans-serif;
  margin-right: 1.3rem;
`;

const ButtonImage = styled.img`
  margin-right: 0.5rem;
`;
