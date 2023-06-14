import React, { useState, useEffect, useMemo, useRef } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { GrLogout } from 'react-icons/gr';

import { logout } from '../../../actions/auth';
import {
  fetchProfileById,
  fetchProfileBySearch
} from '../../../actions/profile';
import useDebounce from '../../../hooks/useDebounce';

import './Navbar.css';
import { navbarItems, debounce } from '../../../utils/sharedResources';
import GenericInput from '../GenericInput';
import Logo from '../Logo';
import Modal from '../Modal';
import ProfileSummary from '../ProfileSummary';

const Navbar = (props) => {
  const DEBOUNCE_DELAY = 500; //ms

  const { profilesBySearch } = props;
  const [index, setIndex] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navbarInputRef = useRef();
  const navigate = useNavigate();

  useDebounce(searchInput, DEBOUNCE_DELAY, props.fetchProfileBySearch);

  // function onChangeHandler(value) {
  //   setSearchInput(value);
  // }

  // const Debounce = (input, delay = 500, func) => {
  //   let timer;
  //   return (...args) => {
  //     clearTimeout(timer);
  //     timer = setTimeout(() => {
  //       func.apply(this, args);
  //     }, delay);
  //   };
  // };

  const toggleModal = (isOpen) => {
    setIsModalOpen(isOpen);
  };

  return (
    <div className={`${props.isVisible ? '' : 'dis-hidden'}`}>
      <div className="full-vw">
        <div className="container" style={{ marginInline: 'unset' }}>
          <div className="navbar info-box" onClick={() => toggleModal(false)}>
            <div className="navbar__left">
              <div className="logo">
                <Logo isShort={true} className="fs-900" />
              </div>
              <div className="navbar__input" ref={navbarInputRef}>
                <GenericInput
                  id="search"
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onBlur={(e) =>
                    e.target.classList.add('navbar__input--narrow')
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleModal(true);
                  }}
                />
                <Modal
                  isOpen={isModalOpen}
                  toggleModal={toggleModal}
                  offsetRef={navbarInputRef}
                  modalId="modal-1"
                  className="modal-slide__modal"
                >
                  <div
                    className="modal__child info-box pos-abs modal-slide__child"
                    onClick={(e) => {
                      e.nativeEvent.stopImmediatePropagation();
                      e.stopPropagation();
                    }}
                  >
                    <h5>the profiles from the debounce</h5>
                    {profilesBySearch &&
                      profilesBySearch.map((profile) => {
                        return (
                          <div
                            className="m-t-s-5"
                            onClick={() => navigate(`/profile/${profile._id}`)}
                          >
                            <ProfileSummary
                              avatar={profile.avatar}
                              name={profile.name}
                              desc={profile.desc}
                              key={profile._id}
                            />
                          </div>
                        );
                      })}
                  </div>
                </Modal>
              </div>
            </div>
            <div className="navbar__right">
              <nav>
                <ul id="navbar-list">
                  {navbarItems.map((item) => (
                    <li
                      key={item.id}
                      className={`${
                        index === item.id ? 'navbar__item--selected' : ''
                      }`}
                    >
                      <a
                        onClick={() => {
                          setIndex(item.id);
                          navigate(`${item.navTo}`);
                        }}
                      >
                        <p className="l-h-200">{item.icon}</p>
                        <p className="l-h-200">{item.label}</p>
                      </a>
                      <div
                        className={`navbar__item-line ${
                          index === item.id ? 'navbar__item--selected' : ''
                        }`}
                      ></div>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="navbar__exit">
                <a
                  onClick={() => {
                    const isApproved = window.confirm(
                      'Are you sure you want to exit?'
                    );
                    if (isApproved) {
                      props.logout();
                      window.location.assign('/login');
                    }
                  }}
                >
                  <GrLogout />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ navbar, profile }) => {
  return {
    isVisible: navbar.isVisible,
    profilesBySearch: profile.profilesBySearch
  };
};

export default connect(mapStateToProps, {
  logout,
  fetchProfileById,
  fetchProfileBySearch
})(Navbar);
