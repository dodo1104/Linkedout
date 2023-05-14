import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';

import setReqAuthToken from '../utils/setReqAuthToken';
import { createPostItems } from '../utils/sharedResources';
import { setAuthToken } from '../actions/auth';
import { fetchOwnProfile } from '../actions/profile';
import { fetchPosts, updatePostsIsLoaded } from '../actions/posts';
import { setNavbarVisibility } from '../actions/navbar';

import './HomePage.css';
import CustomButtonAncher from '../components/UIelements/CustomButtonAncher';
import LoadingLogo from '../components/UIelements/LoadingLogo';
import Modal from '../components/UIelements/Modal';
import Post from '../components/UIelements/Post';
import NewPost from '../components/UIelements/NewPost';

const HomePage = (props) => {
  const { profile, posts, postsLoadingPhase } = props;
  let token = props.token
    ? props.token
    : localStorage.getItem('my-linkedin-token');
  const [isLogoAnimaitonOver, setIsLogoAnimaitonOver] = useState(false);
  const [scrollDirection, setScrollDirection] = useState(null);
  const [postsBlockIndex, setPostsBlockIndex] = useState(0); //the number of the group of the posts (for the backend, to prevent posts repetition)
  const [postsSliceIndex, setPostsSliceIndex] = useState(3); //how many posts to show from all of the posts in the frontend
  const [postsSlice, setPostsSlice] = useState([]); //the posts that we show in the frontend (only some, and add when scrolling to the end of the page)
  const [loadState, setLoadState] = useState('FAILED');
  const [isModalOpen, setIsModalOpen] = useState(false);
  // alert(postsSlice);

  const logoRef = useRef();
  const navigate = useNavigate();

  // token = null;
  // localStorage.removeItem('my-linkedin-token');

  useEffect(() => {
    if (token) {
      setReqAuthToken(token);
      setAuthToken(token);
      localStorage.setItem('my-linkedin-token', token);
    } else navigate('/login');
  }, [token]);

  useEffect(() => {
    if (token) {
      props.fetchOwnProfile(token);
    }
  }, [token]);

  useEffect(() => {
    if (token && profile) {
      props.fetchPosts(token, postsBlockIndex);
      setPostsSliceIndex(3);
    }
  }, [token, profile]);

  useEffect(
    () => async () => {
      if (logoRef.current && profile && posts.length) {
        logoRef.current.setCollapse().then(
          setTimeout(() => {
            props.setNavbarVisibility(true); //show navbar
            setIsLogoAnimaitonOver(true);
          }, 1500) //the length of the collapse animation of logoRef
        ); //finish loading animation
      }
    },
    [profile, posts]
  );

  useEffect(() => {
    // setLoadState(props.postsLoadingPhase);
    console.log('loading state useEffect');
  }, [props.postsLoadingPhase]);

  useEffect(() => {
    if (postsSlice.length < postsSliceIndex) {
      setPostsSlice(posts.slice(0, postsSliceIndex));
    }
  }, [posts, postsSliceIndex]);

  useEffect(() => {
    if (posts.length <= 0) return;
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
      // console.log(window.innerHeight);
      // console.log(window.scrollY);
      // console.log(document.body.offsetHeight);
      const fixYOffset = 3;
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - fixYOffset
      ) {
        // you're at the bottom of the page

        if (postsSliceIndex < posts.length) {
          setPostsSliceIndex(postsSliceIndex + 1); //1 because there are only 5 posts. needs to be atleast 4
        } else {
          // alert('bottom');
          // props.fetchPosts(token, postsBlockIndex + 1);
          setLoadState('LOADING');
        }
      }
    };
    window.addEventListener('scroll', updateScrollDirection); // add event listener
    return () => {
      window.removeEventListener('scroll', updateScrollDirection); // clean up
    };
  }, [scrollDirection, posts, postsSliceIndex]);

  useEffect(() => {
    // console.log('is: ' + postsLoadingPhase === true);
    if (postsLoadingPhase === 'SUCCEEDED') {
      // alert('succeeded');
      setPostsBlockIndex(postsBlockIndex + 1);
      setPostsSliceIndex(postsSliceIndex + 1);
      setLoadState('SUCCEEDED');
    }
    if (postsLoadingPhase === 'FAILED') {
      setLoadState('FAILED');
    }
  }, [postsLoadingPhase]);

  useEffect(() => {
    if (loadState === 'LOADING') {
      props.fetchPosts(token, postsBlockIndex + 1);
    }
    if (loadState === 'SUCCEEDED') {
      // alert('succ');
      setLoadState('FAILED');
    }
  }, [loadState]);

  useEffect(() => {
    if (!posts || !postsSlice) return;
    if (posts[0] != postsSlice[0]) {
      setPostsSlice([posts[0], ...postsSlice]);
      setPostsSliceIndex(postsSliceIndex + 1);
    }
  }, [posts, postsSlice]);

  const toggleModal = (isOpen) => {
    setIsModalOpen(isOpen);
  };

  return (
    <div>
      {isLogoAnimaitonOver == false ? (
        <div className="home-page__loading-logo">
          <LoadingLogo className="fs-950" ref={logoRef} />
        </div>
      ) : (
        <div className="container tran-navbar-offset">
          <div className="home-page grid">
            <div className="home-page__user-info info-box">
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatum reprehenderit vero possimus omnis laudantium
                corporis, temporibus quis ea voluptate esse tenetur molestias at
                distinctio perferendis aut harum aperiam repellendus earum?
              </span>
            </div>
            <div>
              <div className="home-page__create-post info-box">
                <div className="home-page__create-post__top">
                  <img
                    src={`data:image/jpeg;base64,${props.profile.avatar.buffer.data}`}
                  />
                  <input
                    className="input"
                    type="button"
                    value="Create a New Post"
                    onClick={() => toggleModal(true)}
                  />
                  <Modal
                    isOpen={isModalOpen}
                    toggleModal={toggleModal}
                    modalId="modal-2"
                    className="modal--full-vh"
                    isScrolling={false}
                    // offsetRef={navbarInputRef}
                  >
                    <div
                      className="modal__child info-box pos-rel"
                      onClick={(e) => {
                        e.nativeEvent.stopImmediatePropagation();
                        e.stopPropagation();
                      }}
                    >
                      <NewPost
                        avatar={profile.avatar}
                        name={profile.name}
                        toggleModal={toggleModal}
                      />
                    </div>
                  </Modal>
                </div>
                <div className="home-page__create-post__bottom flex flex--center">
                  <ul id="create-post-list" className="flex">
                    {createPostItems.map((item) => {
                      return (
                        <li key={item.id} className="home-page__li">
                          <CustomButtonAncher className="btn-4--gray fw-600 m-nl-s-4 fs-400">
                            {item.icon}
                            <span>{item.label}</span>
                          </CustomButtonAncher>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="home-page__line"></div>
              <div className="home-page__posts">
                {postsSlice.length > 0 &&
                  postsSlice[0] !== undefined &&
                  postsSlice.map((post) => {
                    return (
                      <div className="m-t-m-1">
                        <Post data={post} key={post._id} />
                        {/* {postsSliceIndex}
                        {postsSlice.length}
                        {posts.length}
                        {props.postsLoadingPhase} */}
                      </div>
                    );
                  })}

                <p
                  style={{ fontSize: '3rem', marginTop: '-5rem' }}
                  className={loadState === 'LOADING' ? '' : 'test-1'}
                >
                  LOADING...
                </p>
              </div>
            </div>
            <div className="home-page__rest info-box">ccc</div>
          </div>
        </div>
      )}
    </div>
  );
};

{
} /*how to create an img with dinamic data:
<img src={`data:image/jpeg;base64,${props.profile.avatar.buffer.data}`}/> */

const mapStateToProps = ({ auth, profile, posts }) => {
  // alert(
  //   'HomePage - mapStateToProps  - state: ' + JSON.stringify(posts.isLoaded)
  // );

  return {
    token: auth.token,
    profile: profile.profile,
    posts: posts.posts,
    postsLoadingPhase: posts.isLoaded
  };
};

export default connect(mapStateToProps, {
  setAuthToken,
  setNavbarVisibility,
  fetchOwnProfile,
  fetchPosts,
  updatePostsIsLoaded
})(HomePage);
