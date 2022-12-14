import React, {useEffect, useState} from "react";
import styled from "styled-components";
import axios from "axios";
import {Link} from "react-router-dom";

const CapturedImages = (props: Props) => {
    const {dron} = props;
    const [imageList, setImageList] = useState<Image[]>([]);

    const fetchImages = async () => {
        const res = await axios.get('/dron/image/list', {params: {video_id: dron.id}});
        setImageList(res.data);
    }

    useEffect(() => {
        fetchImages();
    }, [dron]);

    return (
        <RootDiv>
            <ImageGroupDiv>
                {
                    imageList.map((img, index) => (
                        <Link to={`/image/${img.id}`} state={{id: img.id}}>
                            <ImgButton>{index + 1}</ImgButton>
                        </Link>
                    ))
                }
            </ImageGroupDiv>
        </RootDiv>
    )
}

export default CapturedImages;

const RootDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: #212121;
`

const ImageGroupDiv = styled.div`
  display: flex;
  max-height: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  overflow-y: scroll;
`

const CapturedImg = styled.img`
  width: 3rem;
  height: 3rem;
  margin: 1rem;
`

const ImgButton = styled.button`
  width: 3rem;
  height: 3rem;
  margin: 1rem;
  background-color: transparent;
  border: solid 1px white;
  color: white;
`