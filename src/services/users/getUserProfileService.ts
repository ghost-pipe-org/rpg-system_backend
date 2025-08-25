import type { GetUserBasicProfileService } from "./getUserBasicProfileService";
import type { GetUserActivityHistoryService } from "./getUserActivityHistoryService";

interface GetUserProfileServiceRequest {
	userId: string;
}

export class GetUserProfileService {
	constructor(
		private getUserBasicProfileService: GetUserBasicProfileService,
		private getUserActivityHistoryService: GetUserActivityHistoryService,
	) {}

	async execute({ userId }: GetUserProfileServiceRequest) {
		const [basicProfile, activityHistory] = await Promise.all([
			this.getUserBasicProfileService.execute({ userId }),
			this.getUserActivityHistoryService.execute({ userId }),
		]);

		return {
			...basicProfile,
			...activityHistory,
		};
	}
}