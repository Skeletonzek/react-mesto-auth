import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import ImagePopup from './ImagePopup';
import { api } from '../utils/api';
import userAvatarDefault from '../images/profile-img.jpg';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';


function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ name: null, link: null, open: false });
  const [currentUser, setCurrentUser] = React.useState({ name: 'Жак-Ив Кусто', about: 'Исследователь океана', avatar: userAvatarDefault });

  React.useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setCurrentUser(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditProfilePopupOpen(false);
    setSelectedCard({ ...selectedCard, open: false });
  }

  function handleCardClick(name, link) {
    setSelectedCard({ name, link, open: true });
  }

  function handleUpdateUser(user) {
    api.sendUserInfo(user)
      .then(() => {
        setCurrentUser({ ...currentUser, name: user.name, about: user.about });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatar) {
    api.changeAvatar(avatar)
      .then(() => {
        setCurrentUser({ ...currentUser, avatar: avatar.avatar });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {

    api.getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card.id, isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card.id ? newCard : c);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(id) {
    api.deleteCard(id).then(() => {
      const newCards = cards.filter((c) => c._id !== id);
      setCards(newCards);
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(card) {
    api.postNewCard(card).then((newCard) => {
      setCards([...cards, newCard]);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onSubmit={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onSubmit={handleAddPlaceSubmit} />
        <PopupWithForm name="confirm" title="Вы уверены?" submit="Да">

        </PopupWithForm>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onSubmit={handleUpdateAvatar} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <Header />
        <Main cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
