import type React from 'react';
import json from '../../db.json';
import {
  ImageContainer,
  Photo
} from '../stylesheets/styled_components/component_styles/photoStyles';

const Street = () => {
  const data: string[] = json.photoGroups.street.map((item) => item.imgUrl);

  return (
    <ImageContainer className="streetPhotos" style={{ zIndex: -1 }}>
      {data.map((url, i) => (
        <Photo className="belowImage" src={url} key={i} />
      ))}
    </ImageContainer>
  );
};

export default Street;
