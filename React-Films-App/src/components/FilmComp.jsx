import classes from './FilmComp.module.scss';

function FilmComponent({ title, release_date, vote_average, overview, poster_path }) {
    const IMAGE_API = "https://image.tmdb.org/t/p/w1280";

    function returnRating(vote) {

        const fixedScore = vote.toFixed(1);

        let grade;
        let gradeStyle;

        switch (true) {
            case fixedScore >= 8:
                grade = "Excellent";
                gradeStyle = "excellent";
                break;
            case fixedScore >= 7.5:
                grade = "Great";
                gradeStyle = "great";
                break;

            case fixedScore >= 7:
                grade = "Good";
                gradeStyle = "good";
                break;

            case fixedScore >= 6:
                grade = "Ok";
                gradeStyle = "ok";
                break;

            case fixedScore < 6:
                grade = "Bad";
                gradeStyle = "bad";
                break;
        }

        return (
            <span className={`${classes.film__movieInfo__tag} ${classes[gradeStyle]}`}>
                {fixedScore} {grade}
            </span>
        );
    }

    return (
        <div className={classes.film}>
            <img src={poster_path ? (IMAGE_API + poster_path) : 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'} alt={title} />
            <div className={classes.film__movieInfo}>
                <h3>{title}</h3>
                {returnRating(vote_average)}
            </div>

            <div className={classes.film__slideDetails}>
                <h3>Overview:</h3>
                <p>{overview}</p>
                <h3>Release date:</h3>
                <p>{release_date}</p>
            </div>

        </div>
    )
} export default FilmComponent;