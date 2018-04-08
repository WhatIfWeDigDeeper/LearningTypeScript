import { Component } from "@angular/core";
import { MovieInterface } from "../../universal/entities/movie";
import * as interfaces from "../interfaces";

function isValidNewMovie(o: any) {
    if (
        o === null ||
        o === undefined ||
        // new movies don't have ID
        o.id !== undefined ||
        typeof o.title !== "string" ||
        isNaN(o.year)
    ) {
        return false;
    }
    return true;
}

@Component({
    selector: "movies-page",
    template: "Movies!"
})
export class MoviesPageComponent {

    // Contains the movies that have been already loaded from the server
    public movies: MovieInterface[] = [];

    // Used to represent the status of the HTTP GET calls
    public loadStatus: interfaces.Status = "pending";

    // Used to represent the status of the HTTP DELETE call
    public deleteStatus: interfaces.Status = "idle";

    // Used to represent the status of the HTTP POST and HTTP PUT calls
    public saveStatus: interfaces.Status = "idle";

    // Used to desplay the confimation dialog before deleting a movie
    // null hides the modal and number displays the modal
    public deleteMovieId: null | number = null;

    // Used to hold the values of the movie editor or null when nothing is being edited
    public editorValue: null | Partial<MovieInterface> = null;

    public focusEditor() {
        this.editorValue = {};
    }

    public focusOutEditor() {
        this.editorValue = null;
    }

    public focusDeleteDialog(id: number) {
        this.deleteMovieId = id;
    }

    public focusOutDeleteDialog() {
        this.deleteMovieId = null;
    }

    public edit<T extends MovieInterface, K extends keyof T>(key: K, val: T[K]) {
        // const movie = {...(this.editorValue || {}), ...{[key]: val}};
        // this.editorValue = movie;
    }
}

/*
import { MovieInterface } from "../../universal/entities/movie";
import { Container, Row, Column } from "../components/grid_component";
import { ListGroup } from "../components/list_group_component";
import { Modal } from "../components/modal_component";
import { TextField } from "../components/textfield_component";
import { Button } from "../components/button_component";
import { lazyInject } from "../config/ioc";
import { TYPE } from "../contants/types";
import * as interfaces from "../interfaces";

@observer
export class MoviePage extends React.Component {
    @lazyInject(TYPE.MovieStore) public movieStore!: interfaces.MovieStore;
    public componentWillMount() {
        this.movieStore.getAll();
    }
    public render() {
        const error = this.movieStore.loadStatus === "error" ? new Error("Movies could not be loaded!") : null;
        const movies = this.movieStore.loadStatus === "pending" ? null : this.movieStore.movies;
        return (
            <Container>
                <Row>
                    <Column width={12} style={{ textAlign: "right", marginBottom: "10px" }}>
                        <Button
                            onClick={() => {
                                this.movieStore.focusEditor();
                            }}
                        >
                            Add Movie
                        </Button>
                    </Column>
                </Row>
                <Row>
                    <Column width={12}>
                        <ListGroup
                            error={error}
                            items={movies}
                            itemComponent={(movie: MovieInterface) => (
                                <Row>
                                    <Column width={8}>
                                        <h5>{movie.title}</h5>
                                        <p>{movie.year}</p>
                                    </Column>
                                    <Column width={4} style={{ textAlign: "right" }}>
                                        <Button
                                            kind="danger"
                                            onClick={() => {
                                                this.movieStore.focusDeleteDialog(movie.id);
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </Column>
                                </Row>
                            )}
                        />
                    </Column>
                </Row>
                <Modal
                    title="Movie Editor"
                    isVisible={this.movieStore.editorValue !== null}
                    onAcceptLabel="Save"
                    onAccept={() => {
                        if (isValidNewMovie(this.movieStore.editorValue)) {
                            const movie: any = this.movieStore.editorValue;
                            this.movieStore.create(movie);
                        }
                    }}
                    onCancelLabel="Cancel"
                    onCancel={() => {
                        this.movieStore.focusOutEditor();
                    }}
                    error={this.movieStore.saveStatus === "error" ? new Error("Something went wrong") : undefined}
                >

                    <form>
                        <TextField
                            id="movie_title"
                            value={this.movieStore.editorValue ? this.movieStore.editorValue.title : ""}
                            title="Title"
                            placeholder="Title"
                            isValid={(val) => val !== undefined && val !== ""}
                            onChange={(val) => {
                                this.movieStore.edit("title", val);
                            }}
                        />
                        <TextField
                            id="movie_year"
                            value={this.movieStore.editorValue ? this.movieStore.editorValue.year : 2018}
                            title="Year"
                            placeholder="Year"
                            isValid={(val) => typeof val === "number"}
                            onChange={(val) => {
                                const n = parseInt(val);
                                if (!isNaN(n)) {
                                    this.movieStore.edit("year", n);
                                }
                            }}
                        />
                    </form>
                </Modal>
                <Modal
                    title="Are you sure?"
                    isVisible={this.movieStore.deleteMovieId !== null}
                    onAcceptLabel="Delete"
                    onAccept={() => {
                        if (this.movieStore.deleteMovieId) {
                            this.movieStore.delete(this.movieStore.deleteMovieId);
                        }
                    }}
                    onCancelLabel="Cancel"
                    onCancel={() => {
                        this.movieStore.focusOutDeleteDialog();
                    }}
                    error={this.movieStore.deleteStatus === "error" ? new Error("Something went wrong") : undefined}
                >
                    The movie will be deleted permanently!
                </Modal>
            </Container>
        );
    }
}
*/
