export function getServerSideProps() {
    return {
        props: { message: "Welcome to the my Page" },
    };
}
const About = ({ message }) => {
    return (
        <div>
            {message}
        </div>
    )
}

export default About