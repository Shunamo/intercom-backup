import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation  } from 'react-router-dom';
import { useAuth } from './AuthContext';
import axios from 'axios';
import TalkPagination from './TalkPagination'

const Talktalk = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [top100Active, setTop100Active] = useState(true);
  const [allPostsActive, setAllPostsActive] = useState(false);
  const [dateSortActive, setDateSortActive] = useState(true);
  const [likesSortActive, setLikesSortActive] = useState(false);
  const [answersSortActive, setAnswersSortActive] = useState(false);
  const [tempSearchTerm, setTempSearchTerm] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [currentSearch, setCurrentSearch] = useState({ query: '', sort: 'top100' }); // 현재 검색 조건을 저장하는 상태
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [posts, setPosts] = useState([]);
  const [currentSort, setCurrentSort] = useState('viewCounts'); // 기본값은 'viewCounts'로 설정

  const fetchPosts = async (page) => {
    let url = 'http://localhost:8080/talks';
  
    if (currentSort === 'viewCounts') {
      url += '/view-counts';
    } else if (currentSort === 'likes') {
      url += '/like-counts';
    } else if (currentSort === 'date') {
      url += ''; // 날짜 정렬의 경우 기본 엔드포인트 사용
    } else if (currentSort === 'comments'){
      url += '/comment-counts';
    }
  
    url += `?page=${page}`;
  
    try {
      const response = await axios.get(url);
      setPosts(response.data.content);
      setTotalPages(response.data.totalPages);
      setSearchResults(response.data.content);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage, currentSort]); // currentPage와 currentSort를 의존성 배열에 추가
  

  
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage); // 현재 페이지 상태를 업데이트
  };



  useEffect(() => {
    const filteredPosts = allPosts.filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const sortedPosts = filteredPosts.sort((a, b) => {
      const titleA = a.title.toLowerCase().includes(searchTerm.toLowerCase());
      const titleB = b.title.toLowerCase().includes(searchTerm.toLowerCase());
      if (titleA && !titleB) {
          return -1;
      } else if (!titleA && titleB) {
          return 1;
      } else {
          return 0;
      }
  });
  setSearchResults(sortedPosts);
}, [searchTerm]);

useEffect(() => {
  if (isLoggedIn) {
      
     setUserProfile({ imageUrl: '사용자_프로필_이미지_URL'});
  }
}, [isLoggedIn]);

useEffect(() => {
  if (searchTerm === '') {
    if (top100Active) {
      handleTop100Click(); // Top 100 핸들러 실행
    } else {
      setSearchResults(allPosts); // Top 100이 아닌 상태에서는 모든 포스트를 표시
    }
  }
}, [searchTerm, top100Active, allPosts]);



const handleGoPosting=()=>{
  navigate('/posting?from=talktalk'); // URL에 쿼리 파라미터 추가
};

  const handleGoLogin = () => {
    navigate('/join', { state: { from: location } });
  };

  const handleGoSearch = () => {
    navigate('/search');
  };

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSearchTerm(tempSearchTerm);
  
    try {
      const response = await axios.get(`http://localhost:8080/talks/search?query=${tempSearchTerm}?page=1`);
      setSearchResults(response.data.content);
      setCurrentSearch({ ...currentSearch, query: tempSearchTerm }); // 검색 조건 업데이트
    } catch (error) {
      console.error('검색 요청 중 오류가 발생했습니다:', error);
    }
  };
  
  const handleTop100Click = async () => {
    setCurrentSort('viewCounts');

    setTop100Active(true);
    setAllPostsActive(false);

    setCurrentPage(1); // 첫 페이지로 리셋
  };
  
  const handleAllPostsClick = async () => {
    setCurrentSort('date');
    setCurrentPage(1); // 첫 페이지로 리셋

    setTop100Active(false);
    setAllPostsActive(true);
    
    setDateSortActive(true);
    setLikesSortActive(false);
    setAnswersSortActive(false);
    try {
      const response = await axios.get('http://localhost:8080/talks');
      setSearchResults(response.data.content); // 가져온 데이터로 searchResults 상태 업데이트
      
    } catch (error) {
      console.error('최신순으로 데이터를 불러오는 데 실패했습니다.', error);
    }
  };

  const handleSortByDate = async () => {
    setCurrentSort('date');

    setDateSortActive(true);
    setLikesSortActive(false);
    setAnswersSortActive(false);

    setCurrentPage(1); // 첫 페이지로 리셋
  };

  const handleSortByLikes = async () => {
    setCurrentSort('likes');
    setDateSortActive(false);
    setLikesSortActive(true);
    setAnswersSortActive(false);
    setCurrentPage(1); // 첫 페이지로 리셋
  };


const handleSortByAnswers = async () => {
    setCurrentSort('comments');
    setDateSortActive(false);
    setLikesSortActive(false);
    setAnswersSortActive(true);
    setCurrentPage(1);
};

const WritingArea = () => {
  if (isLoggedIn) {
    return (
      <WritingContainer onClick={handleGoPosting}>
        <img src="./assets/TalkTalkUserProfile.png" alt="Profile Icon" style={{ marginRight: '1.5rem' }} />
        <WritingBox>
          질문을 남겨 보세요.
        </WritingBox>
      </WritingContainer>
    );
  } else {
    return (
      <WritingContainer onClick={handleGoLogin}>
                  <img src="./assets/Ellipse2.png" alt="Profile Icon" style={{ marginRight: '1.5rem' }} />
        <WritingBox>
          로그인하고 글을 남겨보세요.
        </WritingBox>
      </WritingContainer>
    );
  }
};


return(
  <PageContainer>
     <WritingArea isLoggedIn={isLoggedIn} navigate={navigate} />
    <TalkButtonContainer>
    <ButtonsContainer>
      <Button onClick={handleTop100Click} active={top100Active}>조회수 Top 100</Button>
      <Button onClick={handleAllPostsClick} active={allPostsActive}>전체 글</Button>
    </ButtonsContainer>
    <TalkContainer >
    <SearchInputContainer onSubmit={handleSubmit}>
  <img src="./assets/SearchGray.png" alt="Search Icon" style={{ margin: '1.19rem 1.75rem 1.21rem 1.75rem' }} onClick={handleGoSearch}/>
  <SearchInput
      type="text"
      placeholder="원하는 글을 검색해 보세요."
      value={tempSearchTerm} // 임시 검색어 사용
      onChange={(e) => setTempSearchTerm(e.target.value)}
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
  {searchResults.length > 0 ? (
      searchResults.map(item => (
          <SearchResultItem 
              key={item.id} 
              onClick={() => navigate(`/talks/${item.id}`)}>
              <p className="title">{item.title}</p>
              <p className="content">{item.content || "내용이 없습니다."}</p>
              <p className="response">답변: {item.commentCount} | 댓글: {item.replyCount} | 조회수: {item.viewCount} | 좋아요: {item.likeCount}</p>
          </SearchResultItem>
      ))
  ) : (
      <div className="none-search">검색 결과가 없습니다.</div>
  )}
</TalkListContainer>
<TalkPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      /> </TalkContainer>
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
min-height: 100vh;
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
cursor: pointer;
`;

const WritingBox = styled.div`
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
min-height: 52.1875rem;
width: 75rem;
`;

const SearchInputContainer = styled.form`
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
cursor: pointer;
.none-search{
  display: flex;
  justify-content: center;
  font-size: 2rem;
  font-family: 'SUITE', sans-serif;
  font-weight: 700;
  color: #A1A1A1;
  margin-top: 10rem;

}

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
