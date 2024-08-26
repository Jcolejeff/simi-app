import Image from 'next/image';

import ratingGreyLogo from '../../images/grey_star.png';
import ratingLogo from '../../images/star.png';

const Star = () => {
  return <Image src={ratingLogo} alt="Rating" width={15} height={15} />;
};

const GreyStar = () => {
  return <Image src={ratingGreyLogo} alt="Rating" width={15} height={15} />;
};

export const Ratings = ({ value }: { value: number }) => {
  const renderRatingLogos = () => {
    switch (value) {
      case 1:
        return (
          <div className="flex items-center justify-start">
            <Star />
            <GreyStar />
            <GreyStar />
            <GreyStar />
            <GreyStar />
          </div>
        );
      case 2:
        return (
          <div className="flex items-center justify-start">
            <Star />
            <Star />
            <GreyStar />
            <GreyStar />
            <GreyStar />
          </div>
        );
      case 3:
        return (
          <div className="flex items-center justify-start">
            <Star />
            <Star />
            <Star />
            <GreyStar />
            <GreyStar />
          </div>
        );
      case 4:
        return (
          <div className="flex items-center justify-start">
            <Star />
            <Star />
            <Star />
            <Star />
            <GreyStar />
          </div>
        );
      case 5:
        return (
          <div className="flex items-center justify-start">
            <Star />
            <Star />
            <Star />
            <Star />
            <Star />
          </div>
        );
      default:
        return null;
    }
  };

  return <div>{renderRatingLogos()}</div>;
};
