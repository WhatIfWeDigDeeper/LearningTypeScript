import { Injectable } from "@angular/core";
import { MovieInterface } from "../../universal/entities/movie";
import * as interfaces from "../interfaces";

@Injectable()
export class MovieService implements interfaces.MovieService {

    public async getAll() {
        return new Promise<MovieInterface[]>(async (res, rej) => {
            try {
                const response = await fetch("/api/v1/movies/", { method: "GET" });
                const movs: MovieInterface[] = await response.json();
                // We use setTimeout to simulate a slow request
                // this should allow us to see the loading component
                setTimeout(
                    () => {
                        res(movs);
                    },
                    1500
                );
            } catch (error) {
                rej(error);
            }
        });
    }

    public async create(movie: Partial<MovieInterface>) {
        try {
            const response = await fetch(
                "/api/v1/movies/",
                {
                    body: JSON.stringify(movie),
                    headers: {
                        "Accept": "application/json, text/plain, */*",
                        "Content-Type": "application/json"
                    },
                    method: "POST"
                }
            );
            const newMovie: MovieInterface = await response.json();
            // this.loadStatus = "done";
            // this.movies.push(newMovie);
            // this.editorValue = null;
        } catch (error) {
            // this.loadStatus = "error";
        }
    }

    public async delete(id: number) {
        try {
            const response = await fetch(`/api/v1/movies/${id}`, { method: "DELETE" });
            await response.json();
            // this.deleteStatus = "done";
            // this.movies = this.movies.filter((m) => m.id !== id);
            // this.deleteMovieId = null;
        } catch (error) {
            // this.deleteStatus = "error";
        }
    }

}