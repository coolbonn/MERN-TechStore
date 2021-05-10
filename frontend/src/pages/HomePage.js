import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import { Message, TechDif } from '../components/Messages'
import { recentProductList } from '../actions/recentProductActions'

const HomePage = () => {
  const recPrList = useSelector((state) => state.recentProduct)
  const { loading, error, cells, tvs, computers, accessories } = recPrList

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(recentProductList())
  }, [dispatch])

  return (
    <div className='home_container'>
      <div className='banner'>
        <img
          src={
            'https://am3pap006files.storage.live.com/y4m3-par8yxvcyAgW4oSoU2XBrmfX3WU6DfiZIzIL9Ug7U52WfEcI-1fkOUj_l-zzU0SjB37pVkohuBrXskmA2Ba7yCao4VazbIm8LozWP9p27UgvvZH66RtIlv5pPZP8kI4kHuES2tjE4RxBEQAYnVi4vylMeDCxc8Hx0zOgvJ81fhGAmDPDejsZA2KeZwR4Hr?width=1280&height=847&cropmode=none'
          }
          alt='Banner'
        />
        <div className='gh'></div>
        <div className='content'>
          <h1>Tech Store</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum eaque
            veritatis itaque, aliquid officia eius temporibus nobis aliquam
            odio? Aliquid corporis voluptatem fugiat dolore, est ipsum sunt
            repellendus culpa tenetur? Laudantium corrupti quam vel beatae
            consectetur ex dolores, quibusdam fugiat magni quas nemo, facere,
            molestias commodi est quaerat quia debitis? Molestias odit
            necessitatibus et nobis.
          </p>
        </div>
      </div>
      {loading ? (
        <Loader className={'home_loader'} />
      ) : error ? (
        <Message className={'danger'} />
      ) : cells || tvs || computers || accessories ? (
        <>
          <div className='product right'>
            <div className='col_1'>
              <img src={cells.image} alt={cells.name} />
            </div>
            <div className='col_2'>
              <h2>{cells.name}</h2>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum,
                explicabo blanditiis sed autem eum libero voluptatum facere,
                expedita id ipsam odio velit animi debitis! Magnam neque
                consequatur laudantium, minus, fugiat porro ad veniam
                perspiciatis laborum temporibus reprehenderit autem dolores
                explicabo quasi nesciunt, quisquam officia esse?
              </p>
              <Link to={`/cellphones/${cells.id}`} className='right_btn'>
                More <i class='fas fa-long-arrow-alt-right'></i>
              </Link>
            </div>
          </div>

          <div className='product left'>
            <div className='col_1'>
              <img src={tvs.image} alt={tvs.name} />
            </div>
            <div className='col_2'>
              <h2>{tvs.name}</h2>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum,
                explicabo blanditiis sed autem eum libero voluptatum facere,
                expedita id ipsam odio velit animi debitis! Magnam neque
                consequatur laudantium, minus, fugiat porro ad veniam
                perspiciatis laborum temporibus reprehenderit autem dolores
                explicabo quasi nesciunt, quisquam officia esse?
              </p>
              <Link to={`/tvs/${tvs.id}`} className='left_btn'>
                <i class='fas fa-long-arrow-alt-left'></i> More
              </Link>
            </div>
          </div>

          <div className='product right'>
            <div className='col_1'>
              <img src={computers.image} alt={computers.name} />
            </div>
            <div className='col_2'>
              <h2>{computers.name}</h2>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum,
                explicabo blanditiis sed autem eum libero voluptatum facere,
                expedita id ipsam odio velit animi debitis! Magnam neque
                consequatur laudantium, minus, fugiat porro ad veniam
                perspiciatis laborum temporibus reprehenderit autem dolores
                explicabo quasi nesciunt, quisquam officia esse?
              </p>
              <Link to={`/computers/${computers.id}`} className='right_btn'>
                More <i class='fas fa-long-arrow-alt-right'></i>
              </Link>
            </div>
          </div>

          <div className='product left'>
            <div className='col_1'>
              <img src={accessories.image} alt={accessories.name} />
            </div>
            <div className='col_2'>
              <h2>{accessories.name}</h2>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum,
                explicabo blanditiis sed autem eum libero voluptatum facere,
                expedita id ipsam odio velit animi debitis! Magnam neque
                consequatur laudantium, minus, fugiat porro ad veniam
                perspiciatis laborum temporibus reprehenderit autem dolores
                explicabo quasi nesciunt, quisquam officia esse?
              </p>
              <Link to={`/accessories/${accessories.id}`} className='left_btn'>
                <i class='fas fa-long-arrow-alt-left'></i> More
              </Link>
            </div>
          </div>
        </>
      ) : (
        <TechDif />
      )}
    </div>
  )
}

export default HomePage
