import SearchBox from '../components/SearchBox'

const PlaygroundPage = () => {
  return <SearchBox onChange={(text) => console.log(text)} />
  // return <Onboarding />;
}

export default PlaygroundPage
