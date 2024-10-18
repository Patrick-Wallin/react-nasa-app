export default function Main(props) {
    const { data } = props;
    return (
        <div className="imgContainer">
            <img src={data.hdurl} alt={data.title || 'Mars Image'} className="bgImage"/>
        </div>
    )
}
