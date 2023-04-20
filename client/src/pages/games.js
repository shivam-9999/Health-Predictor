import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/*
Allow the patient to access fitness games page
designed to encourage patients to exercise
at home. The Gaming students are encouraged
to design/incorporate their own
games/interactive pages.
*/

const games = [
  {
    name: 'Ring Fit Adventure',
    description: `Nintendo's latest entry in the fitness games genre succeeds in properly gamifying exercise where Wii Fit never quite hit the mark. If you're a gym addict you probably shouldn't throw out your membership card just yet, but for everyone else looking to get fitter, Ring Fit Adventure is a fantastic way to do it that won't bore you senseless. Play it properly and you'll definitely feel it the next morning – a sure sign that it's at least doing you some good – while the compelling adventure mode with its RPG elements will ensure that you'll keep coming back for more.`,
    link: 'https://ringfitadventure.nintendo.com/',
    image: 'https://ringfitadventure.nintendo.com/assets/img/share-tw.jpg',
  },
  {
    name: 'Fitness Boxing',
    description: `Fitness Boxing and its sequel (see below) are positioned as lifestyle apps – software to tide you over while you’re on holiday and can’t get to your Boxercise/Body Combat class. In that capacity, they're breezy, energetic successes that get your blood pumping. For the one-time price of a month’s gym membership, they deliver some light CV and takes pointers from the Just Dance series (and various rhythm games) to provide a convenient and engaging workout as you box to the beat. It’s no substitute for hard hours at the gym, but there’s certainly potential to tone up those arms and shed a few pounds.`,
    link: 'https://www.nintendo.com/en-ca/store/products/fitness-boxing-switch/',
    image: 'https://assets-prd.ignimgs.com/2020/09/17/fitness-boxing-2-button-1600379728122.jpg',
  },
  {
    name: 'Just Dance 2022',
    description: `It's Just Dance, and it does what it says on the tin. Just Dance 2022 won't win any prizes for innovation, but it's another solid iteration of the formula with a decent new song list to boot. You’ll want to be subscribed to Just Dance Unlimited to get the most out of your purchase, and if you've already got Just Dance 2021 or Just Dance 2020 or Just Dance 2019 or Just Dance 2018 or Just Dance 2017, it's probably not worth picking this up as well unless you're assembling a Just Dance collection on the shelf (and it's also worth noting that Just Dance 2023 Edition is now available, though physical editions come with a download code instead of a cartridge). Newcomers to the series won’t find a better experience points-based dance game out there. Grab a Joy-Con, get on the floor and... you know what to do. Jiggling about to chart-toppers with costumed dancers doesn't get much better.`,
    link: 'https://www.ubisoft.com/en-ca/game/just-dance/2022',
    image: 'https://image.api.playstation.com/vulcan/img/rnd/202110/1518/grPJBZL7gNnlig2ysyyDoKP0.jpg',
  },
];

const GamesPage = () => (
  <>
    <h1>Fitness Games</h1>
    <p className="mb-4">Here are some games to help you stay healthy!</p>

    <Container>
      <Row>
        {games.map((game) => (
          <Col key={game.name} xs={12} md={6} lg={4}>
            <Card className="mb-4">
              <Card.Img variant="top" src={game.image} />
              <Card.Body>
                <Card.Title>{game.name}</Card.Title>
                <Card.Text>{game.description}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <a href={game.link} target="_blank" rel="noreferrer">Play</a>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  </>
);

export default GamesPage;