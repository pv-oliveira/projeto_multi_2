import { useNavigate } from "react-router-dom";
import "./directory-item.styles.scss";

const DirectoryItem = ({ category }) => {
  const { imageUrl, title, route } = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);
  return (
    <div className="d-flex align-items-center justify-content-center overflow-hidden directory-item-container" onClick={onNavigateHandler}>
      <img class="img-fluid" src={imageUrl} />
      <div className="body text-opacity-25 position-absolute d-flex align-items-center justify-content-center flex-column bg-white">
        <h2>{title}</h2>
        <p>Comprar Agora</p>
      </div>
    </div>
  );
};

export default DirectoryItem;
