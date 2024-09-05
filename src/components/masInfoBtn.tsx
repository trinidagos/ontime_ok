import Image from 'public/Assets/icons/+.svg';

const MasInfoBtn = () => {
  return (
    <button type="button" className="mas-info-btn">
      <Image className="mas-info" src="/Assets/icons/+.svg" alt="Mas información" width={24} height={24} />
    </button>
  );
};

export default MasInfoBtn;