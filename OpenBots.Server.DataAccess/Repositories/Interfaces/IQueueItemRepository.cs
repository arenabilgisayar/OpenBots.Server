﻿using OpenBots.Server.Model;
using OpenBots.Server.Model.Core;
using OpenBots.Server.ViewModel;
using System;

namespace OpenBots.Server.DataAccess.Repositories
{
    public interface IQueueItemRepository : IEntityRepository<QueueItemModel>
    {
        PaginatedList<AllQueueItemsViewModel> FindAllView(Predicate<AllQueueItemsViewModel> predicate = null, string sortColumn = "", OrderByDirectionType direction = OrderByDirectionType.Ascending, int skip = 0, int take = 100);
    }
}
